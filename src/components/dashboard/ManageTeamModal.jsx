import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getTeamMembers, searchUsers, addTeamMember, removeTeamMember, updateTeamMemberRole } from '../../services/teamService';
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
    <div className='relative inline-block text-left' ref={dropdownRef}>
      <div>
        <button
          type='button'
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex justify-between items-center w-[100px] rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-3 py-1 bg-white dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-primary ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {currentRole.label}
          <svg className='-mr-1 ml-1 h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
            <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className='origin-top-right absolute right-0 mt-1 w-[100px] rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-20'>
          <div className='py-1 flex flex-col'>
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  onChange(role.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-gray-700 ${value === role.id ? 'bg-gray-50 dark:bg-gray-700 text-primary font-medium' : 'text-gray-700 dark:text-gray-200'}`}
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ManageTeamModal = ({ team, onClose, onUpdate }) => {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('members'); 
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    fetchMembers();
  }, [team.id]);

  const fetchMembers = async () => {
    setLoading(true);
    const { data } = await getTeamMembers(team.id);
    if (data) setMembers(data);
    setLoading(false);
  };

  useEffect(() => {
    const search = async () => {
      if (searchTerm.length < 2) {
        setSearchResults([]);
        return;
      }
      setSearching(true);
      const { data } = await searchUsers(searchTerm);
      if (data) {
        const memberIds = members.map(m => m.user_id);
        const filtered = data.filter(u => !memberIds.includes(u.id));
        setSearchResults(filtered);
        
        const initialRoles = {};
        filtered.forEach(u => initialRoles[u.id] = 'member');
        setSelectedRoles(prev => ({ ...prev, ...initialRoles }));
      }
      setSearching(false);
    };

    const debounce = setTimeout(search, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, members]);

  const handleRoleSelection = (userId, role) => {
    setSelectedRoles(prev => ({ ...prev, [userId]: role }));
  };

  const handleAddMember = async (userId) => {
    setActionLoading(true);
    const role = selectedRoles[userId] || 'member';
    const { data } = await addTeamMember(team.id, userId, role);
    if (data) {
      setMembers([...members, data]);
      setSearchTerm('');
      setSearchResults(searchResults.filter(u => u.id !== userId));
      if (onUpdate) onUpdate();
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
            className={`py-3 px-4 text-sm font-medium border-b-2 ${activeTab === 'members' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('members')}
          >
            Current Members ({members.length})
          </button>
          <button
            className={`py-3 px-4 text-sm font-medium border-b-2 ${activeTab === 'add' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('add')}
          >
            Add New Member
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
                            <RoleDropdown 
                               value={member.role}
                               onChange={(newRole) => handleChangeRole(member.user_id, newRole)}
                               disabled={actionLoading}
                            />
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
            <div className='space-y-4'>
              <div>
                <label className='sr-only'>Search users</label>
                <div className='relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className='h-5 w-5 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                    </svg>
                  </div>
                  <input
                    type='text'
                    className='focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md py-2 border'
                    placeholder='Search users by name...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {searching && <div className='text-center py-4 text-sm text-gray-500'>Searching...</div>}
              
              {!searching && searchTerm.length >= 2 && searchResults.length === 0 && (
                <div className='text-center py-4 text-sm text-gray-500'>No available users found matching "{searchTerm}"</div>
              )}

              {!searching && searchResults.length > 0 && (
                <ul className='divide-y divide-gray-200 dark:divide-gray-700 mt-4 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden'>
                  {searchResults.map((u) => (
                    <li key={u.id} className='p-3 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50'>
                      <div className='flex items-center'>
                        <div className='h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-300 text-xs font-bold overflow-hidden'>
                          {u.avatar_url ? (
                            <img src={u.avatar_url} alt="" className='h-full w-full object-cover' />
                          ) : (
                            (u.first_name?.[0] || '?') + (u.last_name?.[0] || '')
                          )}
                        </div>
                        <div className='ml-3'>
                          <p className='text-sm font-medium text-gray-900 dark:text-white'>
                            {u.first_name} {u.last_name}
                          </p>
                          {u.title && <p className='text-xs text-gray-500 dark:text-gray-400'>{u.title}</p>}
                        </div>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RoleDropdown
                          value={selectedRoles[u.id] || 'member'}
                          onChange={(newRole) => handleRoleSelection(u.id, newRole)}
                          disabled={actionLoading}
                        />
                        <button
                          onClick={() => handleAddMember(u.id)}
                          disabled={actionLoading}
                          className='px-3 py-1 text-xs font-medium text-white bg-primary hover:bg-primary-dark rounded transition-colors disabled:opacity-50'
                        >
                          Add
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ManageTeamModal;
