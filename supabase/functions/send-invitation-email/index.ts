import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

serve(async (req) => {
  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set in environment variables.')
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    const payload = await req.json()
    const { token, email, team_id, invited_by } = payload.record

    if (!email) {
      return new Response(JSON.stringify({ message: 'No email provided, skipping.' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    const supabaseAdmin = createClient(
      SUPABASE_URL ?? '',
      SUPABASE_SERVICE_ROLE_KEY ?? ''
    )

    const { data: teamData } = await supabaseAdmin
      .from('teams')
      .select('name')
      .eq('id', team_id)
      .single()

    const { data: inviterData } = await supabaseAdmin
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', invited_by)
      .single()

    const teamName = teamData?.name || 'a team'
    const inviterName = inviterData ? `${inviterData.first_name} ${inviterData.last_name}` : 'Someone'

    const ORIGIN_URL = Deno.env.get('ORIGIN_URL') || 'http://localhost:5173'
    const inviteLink = `${ORIGIN_URL}/join/${token}`

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: `${inviterName} has invited you to join ${teamName}`,
        html: `
          <h2>You've been invited to join ${teamName}!</h2>
          <p>${inviterName} has invited you to collaborate with them on SaaSPro.</p>
          <p>
            <a href="${inviteLink}" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Accept Invitation
            </a>
          </p>
          <p>Or alternatively, copy and paste this link into your browser: <br> ${inviteLink}</p>
        `,
      }),
    })

    const data = await res.json()

    return new Response(JSON.stringify({ message: 'Email sent successfully!', data }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
