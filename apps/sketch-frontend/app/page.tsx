"use client"
import DashboardPage from '@/components/Dashboard';
import LandingPage from '@/components/LandingPage';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

export default function Home () {
    const {isLogged} = useAuthRedirect();
    return !isLogged ? <LandingPage/> : <DashboardPage/>;
}
