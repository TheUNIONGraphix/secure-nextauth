import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const isAuthenticated = !!session?.user;
    
    return Response.json({ isAuthenticated });
  } catch (error) {
    console.error('Auth status check failed:', error);
    return Response.json({ isAuthenticated: false }, { status: 500 });
  }
}
