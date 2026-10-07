import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import RoleRoute from '@/routes/RoleRoute';
import ToastContainer from '@/components/shared/ToastContainer';
import { useAuthStore } from '@/store/authStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { ensureSeeded } from '@/services/db';
import HomePage from '@/pages/public/HomePage';
import MastersPage from '@/pages/public/MastersPage';
import MasterProfilePage from '@/pages/public/MasterProfilePage';
import CategoriesPage from '@/pages/public/CategoriesPage';
import CategoryDetailPage from '@/pages/public/CategoryDetailPage';
import HowItWorksPage from '@/pages/public/HowItWorksPage';
import BecomeMasterPage from '@/pages/public/BecomeMasterPage';
import SafetyPage from '@/pages/public/SafetyPage';
import SupportPage from '@/pages/public/SupportPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterChoicePage from '@/pages/auth/RegisterChoicePage';
import CustomerRegisterPage from '@/pages/auth/CustomerRegisterPage';
import MasterRegisterPage from '@/pages/auth/MasterRegisterPage';
import CustomerDashboardPage from '@/pages/customer/CustomerDashboardPage';
import CustomerRequestsPage from '@/pages/customer/CustomerRequestsPage';
import CustomerOrdersPage from '@/pages/customer/CustomerOrdersPage';
import CustomerFavoritesPage from '@/pages/customer/CustomerFavoritesPage';
import CustomerMessagesPage from '@/pages/customer/CustomerMessagesPage';
import CustomerProfilePage from '@/pages/customer/CustomerProfilePage';
import CustomerSettingsPage from '@/pages/customer/CustomerSettingsPage';
import NotificationCenterPage from '@/pages/shared/NotificationCenterPage';
import MasterOnboardingPage from '@/pages/master/MasterOnboardingPage';
import MasterDashboardPage from '@/pages/master/MasterDashboardPage';
import MasterRequestsPage from '@/pages/master/MasterRequestsPage';
import MasterOrdersPage from '@/pages/master/MasterOrdersPage';
import MasterServicesPage from '@/pages/master/MasterServicesPage';
import MasterPortfolioPage from '@/pages/master/MasterPortfolioPage';
import MasterSchedulePage from '@/pages/master/MasterSchedulePage';
import MasterCalendarPage from '@/pages/master/MasterCalendarPage';
import MasterReviewsPage from '@/pages/master/MasterReviewsPage';
import MasterStatisticsPage from '@/pages/master/MasterStatisticsPage';
import MasterMessagesPage from '@/pages/master/MasterMessagesPage';
import MasterProfileSettingsPage from '@/pages/master/MasterProfilePage';
import MasterSettingsPage from '@/pages/master/MasterSettingsPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminMastersPage from '@/pages/admin/AdminMastersPage';
import AdminVerificationPage from '@/pages/admin/AdminVerificationPage';
import AdminOrdersPage from '@/pages/admin/AdminOrdersPage';
import AdminCategoriesPage from '@/pages/admin/AdminCategoriesPage';
import AdminReviewsPage from '@/pages/admin/AdminReviewsPage';
import AdminReportsPage from '@/pages/admin/AdminReportsPage';
import AdminStatisticsPage from '@/pages/admin/AdminStatisticsPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';
import AdminSupportPage from '@/pages/admin/AdminSupportPage';
import AdminNotificationsPage from '@/pages/admin/AdminNotificationsPage';
import AdminPremiumPage from '@/pages/admin/AdminPremiumPage';
import AdminTelegramPage from '@/pages/admin/AdminTelegramPage';
import AdminMobileAppPage from '@/pages/admin/AdminMobileAppPage';
import NotFoundPage from '@/pages/NotFoundPage';
export default function App() {
  const {
    init
  } = useAuthStore();
  const {
    init: initFavorites
  } = useFavoritesStore();
  useEffect(() => {
    ensureSeeded();
    init();
    initFavorites();
  }, [init, initFavorites]);
  return <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/masters" element={<MastersPage />} />
          <Route path="/masters/:slug" element={<MasterProfilePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:slug" element={<CategoryDetailPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/become-master" element={<BecomeMasterPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/support" element={<SupportPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterChoicePage />} />
          <Route path="/register/customer" element={<CustomerRegisterPage />} />
          <Route path="/register/master" element={<MasterRegisterPage />} />

          <Route path="/master/onboarding" element={<RoleRoute role="master"><MasterOnboardingPage /></RoleRoute>} />
        </Route>

        <Route path="/customer" element={<RoleRoute role="customer"><DashboardLayout /></RoleRoute>}>
          <Route index element={<CustomerDashboardPage />} />
          <Route path="requests" element={<CustomerRequestsPage />} />
          <Route path="orders" element={<CustomerOrdersPage />} />
          <Route path="favorites" element={<CustomerFavoritesPage />} />
          <Route path="messages" element={<CustomerMessagesPage />} />
          <Route path="notifications" element={<NotificationCenterPage />} />
          <Route path="profile" element={<CustomerProfilePage />} />
          <Route path="settings" element={<CustomerSettingsPage />} />
        </Route>

        <Route path="/master" element={<RoleRoute role="master"><DashboardLayout /></RoleRoute>}>
          <Route index element={<MasterDashboardPage />} />
          <Route path="requests" element={<MasterRequestsPage />} />
          <Route path="orders" element={<MasterOrdersPage />} />
          <Route path="calendar" element={<MasterCalendarPage />} />
          <Route path="services" element={<MasterServicesPage />} />
          <Route path="portfolio" element={<MasterPortfolioPage />} />
          <Route path="schedule" element={<MasterSchedulePage />} />
          <Route path="reviews" element={<MasterReviewsPage />} />
          <Route path="statistics" element={<MasterStatisticsPage />} />
          <Route path="messages" element={<MasterMessagesPage />} />
          <Route path="notifications" element={<NotificationCenterPage />} />
          <Route path="profile" element={<MasterProfileSettingsPage />} />
          <Route path="settings" element={<MasterSettingsPage />} />
        </Route>

        <Route path="/admin" element={<RoleRoute role="admin"><DashboardLayout /></RoleRoute>}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="masters" element={<AdminMastersPage />} />
          <Route path="verification" element={<AdminVerificationPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="reviews" element={<AdminReviewsPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="support" element={<AdminSupportPage />} />
          <Route path="notifications" element={<AdminNotificationsPage />} />
          <Route path="statistics" element={<AdminStatisticsPage />} />
          <Route path="premium" element={<AdminPremiumPage />} />
          <Route path="telegram" element={<AdminTelegramPage />} />
          <Route path="mobile-app" element={<AdminMobileAppPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>;
}
