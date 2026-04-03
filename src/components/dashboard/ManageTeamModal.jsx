import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getTeamMembers, searchUsers, addTeamMember, removeTeamMember, updateTeamMemberRole, createTeamInvitation, getTeamInvitations, deleteTeamInvitation } from '../../services/teamService';
import { useAuth } from '../../contexts/AuthContext';

const RoleDropdown = ({ value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles = [
    { id: 'member', label: 'Member' },
    { id: 'admin', label: 'Admin' },
    { id: 'viewer', label: 'Viewer' }
  ];

  const currentRole = roles.find(r => r.id === value) || roles[0];

  return (
    <div className='relative inline-block text-left w-full' ref={dropdownRef}>
      <div>
        <button
          type='button'
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex justify-between items-center w-full rounded-md shadow-sm px-4 py-2 bg-gray-50 dark:bg-gray-700/50 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none ${open ? "border-primary ring-1 ring-primary" : "border-transparent"} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {currentRole.label}
          <svg className='-mr-1 ml-2 h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
            <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className='origin-top-right absolute left-0 right-0 mt-1 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-20 max-h-60 overflow-auto'>
          <div className='py-1 flex flex-col w-full'>
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  onChange(role.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${value === role.id ? 'bg-gray-50 dark:bg-gray-700 text-primary font-medium' : 'text-gray-700 dark:text-gray-200'}`}
              >
                <span className="block truncate">{role.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Role descriptions
const roleDescriptions = {
  admin: "Has full access to all team settings, billing, and member management.",
  member: "Can work with team resources, projects, and documents.",
  viewer: "Can only view team resources but cannot make any changes."
};

const ManageTeamModal = ({ team, onClose, onUpdate }) => {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('members');

  const [inviteEmails, setInviteEmails] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchMembersAndInvites();
  }, [team.id]);

  const fetchMembersAndInvites = async () => {
    setLoading(true);
    const { data: membersData } = await getTeamMembers(team.id);
    if (membersData) setMembers(membersData);
    
    // Also fetch invitations
    const { data: invData } = await getTeamInvitations(team.id);
    if (invData) setInvitations(invData);
    setLoading(false);
  };

  const handleGenerateInvite = async () => {
    if (!inviteEmails.trim()) return;
    
    // Split by comma, trim spaces, filter map empty strings
    const emailsList = inviteEmails
      .split(',')
      .map(e => e.trim())
      .filter(e => /^\S+@\S+\.\S+$/.test(e));
      
    if (emailsList.length === 0) return;

    setActionLoading(true);
    const { data } = await createTeamInvitation(team.id, inviteRole, emailsList);
    if (data) {
      setInvitations([...invitations, ...data]);
      setInviteEmails('');
    }
    setActionLoading(false);
  };

  const handleDeleteInvite = async (invId) => {
    setActionLoading(true);
    const { success } = await deleteTeamInvitation(invId);
    if (success) {
      setInvitations(invitations.filter((i) => i.id !== invId));
    }
    setActionLoading(false);
  };

  const handleRemoveMember = async (userId) => {
    if (userId === user.id && team.owner_id === user.id) return; 
    if (window.confirm('Are you sure you want to remove this member?')) {
      setActionLoading(true);
      const { success } = await removeTeamMember(team.id, userId);
      if (success) {
        setMembers(members.filter(m => m.user_id !== userId));
        if (onUpdate) onUpdate();
      }
      setActionLoading(false);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    setActionLoading(true);
    const { success } = await updateTeamMemberRole(team.id, userId, newRole);
    if (success) {
      setMembers(members.map(m => m.user_id === userId ? { ...m, role: newRole } : m));
    }
    setActionLoading(false);
  };

  const isCurrentUserOwner = team.owner_id === user.id;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-opacity'>
      <div className='fixed inset-0' aria-hidden='true' onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className='relative z-10 bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-xl w-full flex flex-col max-h-[80vh]'
      >
        <div className='flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'>
          <div>
            <h3 className='text-lg font-medium text-gray-900 dark:text-white'>Manage Team: {team.name}</h3>
            <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Add or remove team members</p>
          </div>
          <button onClick={onClose} className='text-gray-400 hover:text-gray-500 focus:outline-none'>
            <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        <div className='flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-6'>
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 ${activeTab === 'members' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}                                                                                                        onClick={() => setActiveTab('members')}
          >
            Current Members ({members.length})
          </button>
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 ${activeTab === 'add' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}                                                                                                            onClick={() => setActiveTab('add')}
          >
            Invite Members
          </button>
        </div>

        <div className='overflow-y-auto p-6 flex-1'>
          {activeTab === 'members' ? (
            loading ? (
              <div className='flex justify-center p-8'><div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary'></div></div>    
            ) : (
              <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
                {members.map((member) => (
                  <li key={member.id} className='py-3 flex justify-between items-center'>
                    <div className='flex items-center'>
                      <div className='h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden'>
                        {member.profile?.avatar_url ? (
                          <img src={member.profile.avatar_url} alt="" className='h-full w-full object-cover' />
                        ) : (
                          (member.profile?.first_name?.[0] || '?') + (member.profile?.last_name?.[0] || '')
                        )}
                      </div>
                      <div className='ml-3'>
                        <p className='text-sm font-medium text-gray-900 dark:text-white'>
                          {member.profile?.first_name} {member.profile?.last_name}
                          {member.user_id === user.id && <span className='ml-2 text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded'>You</span>}
                          {team.owner_id === member.user_id && <span className='ml-2 text-xs text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded'>Owner</span>}  
                        </p>
                        <div className='text-xs text-gray-500 dark:text-gray-400 capitalize pt-1'>
                          {team.owner_id !== member.user_id && isCurrentUserOwner ? (
                            <div className="w-32 mt-1">
                              <RoleDropdown
                                 value={member.role}
                                 onChange={(newRole) => handleChangeRole(member.user_id, newRole)}
                                 disabled={actionLoading}
                              />
                            </div>
                          ) : (
                            member.role
                          )}
                        </div>
                      </div>
                    </div>
                    {member.user_id !== team.owner_id && (isCurrentUserOwner || member.user_id === user.id) && (
                      <button
                        onClick={() => handleRemoveMember(member.user_id)}
                        disabled={actionLoading}
                        className='text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50'
                      >
                         {member.user_id === user.id ? 'Leave' : 'Remove'}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )
          ) : (
            <div className='space-y-8'>
              <div>
                <div className='flex justify-between items-start mb-2'>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Send Invites To</h3>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Invite users to access CRM. Specify their roles to control access and permissions
                    </p>
                  </div>
                  <button
                    onClick={handleGenerateInvite}
                    disabled={actionLoading || !inviteEmails.trim()}
                    className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none disabled:opacity-50 transition-colors'
                  >
                    {actionLoading ? 'Sending...' : 'Send Invites'}
                  </button>
                </div>

                <div className='mt-6 space-y-6'>
                  <div>
                    <label htmlFor='inviteEmails' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                      Invite By Email
                    </label>
                    <textarea
                      id='inviteEmails'
                      rows={3}
                      className='shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700/50 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-3 py-2 border'
                      placeholder='user1@example.com, user2@example.com, ...'
                      value={inviteEmails}
                      onChange={(e) => setInviteEmails(e.target.value)}
                    />
                    <p className='mt-2 text-xs text-gray-500 dark:text-gray-400'>
                      You can invite multiple users by comma separating their email addresses
                    </p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                      Invite As
                    </label>
                    <div className='relative w-full'>
                      <RoleDropdown
                        value={inviteRole}
                        onChange={setInviteRole}
                        disabled={actionLoading}
                      />
                    </div>
                    <p className='mt-2 text-xs text-gray-500 dark:text-gray-400'>
                      {roleDescriptions[inviteRole]}
                    </p>
                  </div>
                </div>
              </div>

              {invitations && invitations.length > 0 && (
                <div className='pt-6 border-t border-gray-200 dark:border-gray-700'>
                  <h4 className='text-md font-semibold text-gray-900 dark:text-white mb-4'>Pending Invites</h4>
                  <ul className='space-y-2'>
                    {invitations.map((inv) => (
                      <li key={inv.id} className='bg-gray-50 dark:bg-gray-800/50 rounded-md px-4 py-3 flex justify-between items-center group border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors'>
                        <div className="flex items-center">
                          <span className='text-sm text-gray-900 dark:text-gray-100 font-medium'>
                            {inv.email || "Link Invitation"}
                          </span>
                          <span className='ml-2 text-sm text-gray-500 dark:text-gray-400 capitalize'>
                            ({inv.role === 'admin' ? 'Admin' : inv.role === 'viewer' ? 'Viewer' : 'Member'})
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteInvite(inv.id)}
                          disabled={actionLoading}
                          className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50'
                          title="Revoke invitation"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ManageTeamModal;
