CREATE TABLE IF NOT EXISTS public.team_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  token TEXT NOT NULL UNIQUE,
  email TEXT,
  role TEXT DEFAULT 'member',
  invited_by UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '7 days'
);

-- Ensure email column is added if table already existed
ALTER TABLE public.team_invitations ADD COLUMN IF NOT EXISTS email TEXT;

ALTER TABLE public.team_invitations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can create invitations for their teams" ON public.team_invitations;
CREATE POLICY "Users can create invitations for their teams"
  ON public.team_invitations FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.teams
      WHERE id = team_id AND owner_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Anyone can view an invitation by token" ON public.team_invitations;
CREATE POLICY "Anyone can view an invitation by token"
  ON public.team_invitations FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can view invitations they sent" ON public.team_invitations;
CREATE POLICY "Users can view invitations they sent"
  ON public.team_invitations FOR SELECT
  USING (invited_by = auth.uid());

DROP POLICY IF EXISTS "Users can delete invitations they sent" ON public.team_invitations;
CREATE POLICY "Users can delete invitations they sent"
  ON public.team_invitations FOR DELETE
  USING (invited_by = auth.uid());
