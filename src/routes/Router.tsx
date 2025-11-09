import { lazy, ReactElement } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import RouteErrorBoundary from 'src/RouteErrorBoundary';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(
  lazy(() => import('../layouts/blank/BlankLayout'))
);

/* ****Pages***** */
const EirIn = Loadable(lazy(() => import('../views/operations/EirIn')));
const Admissions = Loadable(
  lazy(() => import('../views/operations/Admissions'))
);
const Cro = Loadable(lazy(() => import('../views/operations/Bonus')));
const PickupSlip = Loadable(
  lazy(() => import('../views/operations/PickupSlip'))
);
const SaleUnit = Loadable(lazy(() => import('../views/operations/SaleUnit')));
const ChangeGrade = Loadable(
  lazy(() => import('../views/operations/ChangeGrade'))
);
const Schedule = Loadable(lazy(() => import('../views/edifact/Schedule')));
const Generate = Loadable(lazy(() => import('../views/edifact/Generate')));
const BulkGenerate = Loadable(
  lazy(() => import('../views/edifact/BulkGenerate'))
);
const ContainerReport = Loadable(
  lazy(() => import('../views/edifact/ContainerReport'))
);
const EDIReport = Loadable(lazy(() => import('../views/edifact/EdiReport')));
const CopranLog = Loadable(lazy(() => import('../views/edifact/CopranLog')));
const AdditionService = Loadable(
  lazy(() => import('../views/service-record/AdditionService'))
);
const GeneralService = Loadable(
  lazy(() => import('../views/service-record/GeneralService'))
);
const RepairService = Loadable(
  lazy(() => import('../views/service-record/RepairServices'))
);
const StorageService = Loadable(
  lazy(() => import('../views/service-record/StorageServices'))
);
const FasahIn = Loadable(lazy(() => import('../views/fasah/In')));
const FasahOut = Loadable(lazy(() => import('../views/fasah/Out')));
const FasahBulkAppointment = Loadable(
  lazy(() => import('../views/fasah/BulkAppointment'))
);
const FasahBulkDownload = Loadable(
  lazy(() => import('../views/fasah/BulkDownload'))
);
const FasahPayment = Loadable(
  lazy(() => import('../views/fasah/FasahPayment'))
);
const FasahBulkPayment = Loadable(
  lazy(() => import('../views/fasah/BulkPayment'))
);
const VehicleIn = Loadable(
  lazy(() => import('../views/vehicle-operation/VehicleIn'))
);
const VehicleOut = Loadable(
  lazy(() => import('../views/vehicle-operation/VehicleOut'))
);
const VehicleOutside = Loadable(
  lazy(() => import('../views/vehicle-operation/VehicleOutside'))
);
const VehiclePickupSlip = Loadable(
  lazy(() => import('../views/vehicle-operation/VehiclePickupSlip'))
);

const SummaryReport = Loadable(lazy(() => import('../views/reports/Summary')));
const GateInOperationReport = Loadable(
  lazy(() => import('../views/reports/GateInOperation'))
);
const GateOutOperationReport = Loadable(
  lazy(() => import('../views/reports/GateOutOperation'))
);
const CustomerFasahReport = Loadable(
  lazy(() => import('../views/reports/CustomerFasah'))
);
const ContainerFasahReport = Loadable(
  lazy(() => import('../views/reports/ContainerFasah'))
);
const CroReport = Loadable(lazy(() => import('../views/reports/Cro')));
const EachCroReport = Loadable(lazy(() => import('../views/reports/EachCro')));
const AllCroReport = Loadable(lazy(() => import('../views/reports/AllCro')));
const StockReport = Loadable(
  lazy(() => import('../views/reports/StockReport'))
);
const StockReport1 = Loadable(
  lazy(() => import('../views/reports/StockReport1'))
);
const StockSaleUnitReport = Loadable(
  lazy(() => import('../views/reports/StockSaleUnit'))
);
const DepotGateInReport = Loadable(
  lazy(() => import('../views/reports/GateInUnits'))
);
const DepotGateOutReport = Loadable(
  lazy(() => import('../views/reports/GateOutUnits'))
);
const DepotTruckTrafficReport = Loadable(
  lazy(() => import('../views/reports/TruckTrafic'))
);
const VehicleInReport = Loadable(
  lazy(() => import('../views/reports/VehicleIn'))
);
const VehicleOutReport = Loadable(
  lazy(() => import('../views/reports/VehicleOut'))
);
const ContainerOnGroundReport = Loadable(
  lazy(() => import('../views/reports/ContainerOnGround'))
);
const ContainerHistoryReport = Loadable(
  lazy(() => import('../views/reports/ContainerHistory'))
);
const PrintEirReport = Loadable(
  lazy(() => import('../views/reports/PrintEir'))
);
const User = Loadable(lazy(() => import('../views/apps/User')));
const Roles = Loadable(lazy(() => import('../views/apps/Roles')));
const LoginDetails = Loadable(lazy(() => import('../views/apps/LoginDetail')));
const RepairServices = Loadable(
  lazy(() => import('../views/work-shop/RepairServices'))
);
const ServiceManagement = Loadable(
  lazy(() => import('../views/work-shop/ServiceManagement'))
);
const ContainerData = Loadable(
  lazy(() => import('../views/master-data/Container'))
);
const SocContainerData = Loadable(
  lazy(() => import('../views/master-data/SocContainer'))
);
const ContainerWarningsData = Loadable(
  lazy(() => import('../views/master-data/ContainerWarnings'))
);
const ScrapData = Loadable(lazy(() => import('../views/master-data/Scrap')));
const TransporterData = Loadable(
  lazy(() => import('../views/master-data/Transporter'))
);
const TruckData = Loadable(lazy(() => import('../views/master-data/Truck')));
const DriverData = Loadable(lazy(() => import('../views/master-data/Driver')));
const BulkUploadData = Loadable(
  lazy(() => import('../views/master-data/BulkUpload'))
);
const ImageData = Loadable(lazy(() => import('../views/master-data/Image')));
const BankData = Loadable(lazy(() => import('../views/master-data/Bank')));
const CustomerData = Loadable(
  lazy(() => import('../views/master-data/Customer'))
);
const IsoCode = Loadable(lazy(() => import('../views/apps/IsoCode')));
const ShippingLine = Loadable(lazy(() => import('../views/apps/ShippingLine')));
const ContainerGrade = Loadable(
  lazy(() => import('../views/apps/ContainerGrade'))
);
const ReportSchedule = Loadable(
  lazy(() => import('../views/apps/ReportSchedule'))
);

// authentication
const Login = Loadable(
  lazy(() => import('../views/authentication/auth1/Login'))
);
const Login2 = Loadable(
  lazy(() => import('../views/authentication/auth2/Login2'))
);
const Register = Loadable(
  lazy(() => import('../views/authentication/auth1/Register'))
);
const Register2 = Loadable(
  lazy(() => import('../views/authentication/auth2/Register2'))
);
const ForgotPassword = Loadable(
  lazy(() => import('../views/authentication/auth1/ForgotPassword'))
);
const ForgotPassword2 = Loadable(
  lazy(() => import('../views/authentication/auth2/ForgotPassword2'))
);
const TwoSteps = Loadable(
  lazy(() => import('../views/authentication/auth1/TwoSteps'))
);
const TwoSteps2 = Loadable(
  lazy(() => import('../views/authentication/auth2/TwoSteps2'))
);
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Maintenance = Loadable(
  lazy(() => import('../views/authentication/Maintenance'))
);

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

const Router = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <FullLayout />
      </ProtectedRoute>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: '/', element: <Navigate to="/al-munir-system/users" /> },
      { path: '/al-munir-system/users', exact: true, element: <EirIn /> },
      { path: '/operations/admissions', element: <Admissions /> },
      { path: '/operations/bonus', element: <Cro /> },
      // { path: '/operations/pickup-slips', element: <PickupSlip /> },
      // { path: '/operations/sale-unit', element: <SaleUnit /> },
      // { path: '/operations/change-grade', element: <ChangeGrade /> },
      // { path: '/edifact/schedule', element: <Schedule /> },
      // { path: '/edifact/generate', element: <Generate /> },
      // { path: '/edifact/bulk-generate', element: <BulkGenerate /> },
      // { path: '/edifact/container-report', element: <ContainerReport /> },
      // { path: '/edifact/edi-report', element: <EDIReport /> },
      // { path: '/edifact/copran-log', element: <CopranLog /> },
      // {
      //   path: '/service-record/addition-service',
      //   element: <AdditionService />,
      // },
      // { path: '/service-record/general-service', element: <GeneralService /> },
      // { path: '/service-record/repair-service', element: <RepairService /> },
      // { path: '/service-record/storage-service', element: <StorageService /> },
      // { path: '/fasah/in', element: <FasahIn /> },
      // { path: '/fasah/out', element: <FasahOut /> },
      // { path: '/fasah/bulk-appointment', element: <FasahBulkAppointment /> },
      // { path: '/fasah/bulk-download', element: <FasahBulkDownload /> },
      // { path: '/fasah/payment', element: <FasahPayment /> },
      // { path: '/fasah/bulk-payment', element: <FasahBulkPayment /> },
      // { path: '/vehicle-operation/in', element: <VehicleIn /> },
      // { path: '/vehicle-operation/out', element: <VehicleOut /> },
      // { path: '/vehicle-operation/outside', element: <VehicleOutside /> },
      // {
      //   path: '/vehicle-operation/pickup-slip',
      //   element: <VehiclePickupSlip />,
      // },
      // { path: '/reports/summary', element: <SummaryReport /> },
      // {
      //   path: '/reports/gate-in-operation',
      //   element: <GateInOperationReport />,
      // },
      // {
      //   path: '/reports/gate-out-operation',
      //   element: <GateOutOperationReport />,
      // },
      // { path: '/reports/fasah-customer', element: <CustomerFasahReport /> },
      // { path: '/reports/fasah-container', element: <ContainerFasahReport /> },
      // { path: '/reports/cro', element: <CroReport /> },
      // { path: '/reports/each-cro', element: <EachCroReport /> },
      // { path: '/reports/all-cro', element: <AllCroReport /> },
      // { path: '/reports/stock-report', element: <StockReport /> },
      // { path: '/reports/stock-report1', element: <StockReport1 /> },
      // { path: '/reports/stock-sale-unit', element: <StockSaleUnitReport /> },
      // { path: '/reports/depot-gate-in', element: <DepotGateInReport /> },
      // { path: '/reports/depot-gate-out', element: <DepotGateOutReport /> },
      // {
      //   path: '/reports/depot-truck-traffic',
      //   element: <DepotTruckTrafficReport />,
      // },
      // { path: '/reports/vehicle-in', element: <VehicleInReport /> },
      // { path: '/reports/vehicle-out', element: <VehicleOutReport /> },
      // {
      //   path: '/reports/container-on-ground',
      //   element: <ContainerOnGroundReport />,
      // },
      // {
      //   path: '/reports/container-history',
      //   element: <ContainerHistoryReport />,
      // },
      // { path: '/reports/print-eir', element: <PrintEirReport /> },
      // { path: '/user-management/user', element: <User /> },
      // { path: '/user-management/roles', element: <Roles /> },
      // { path: '/user-management/login-details', element: <LoginDetails /> },
      // { path: '/work-shop/repair-services', element: <RepairServices /> },
      // { path: '/work-shop/service-management', element: <ServiceManagement /> },
      // { path: '/master-data/container', element: <ContainerData /> },
      // { path: '/master-data/soc-container', element: <SocContainerData /> },
      // {
      //   path: '/master-data/container-warnings',
      //   element: <ContainerWarningsData />,
      // },
      // { path: '/master-data/scrap', element: <ScrapData /> },
      // { path: '/master-data/transporter', element: <TransporterData /> },
      // { path: '/master-data/truck', element: <TruckData /> },
      // { path: '/master-data/driver', element: <DriverData /> },
      // { path: '/master-data/bulk-upload', element: <BulkUploadData /> },
      // { path: '/master-data/image', element: <ImageData /> },
      // { path: '/master-data/bank', element: <BankData /> },
      // { path: '/master-data/customer', element: <CustomerData /> },
      // { path: '/apps/iso-code', element: <IsoCode /> },
      // { path: '/apps/shipping-line', element: <ShippingLine /> },
      // { path: '/apps/container-grade', element: <ContainerGrade /> },
      // { path: '/apps/report-schedule', element: <ReportSchedule /> },

      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  // {
  //   path: '/',
  //   element: <BlankLayout />,
  //   errorElement: <RouteErrorBoundary />,
  //   children: [
  //     { path: '/auth/404', element: <Error /> },
  { path: '/auth/login', element: <Login /> },
  //     { path: '/auth/login2', element: <Login2 /> },
  //     { path: '/auth/register', element: <Register /> },
  //     { path: '/auth/register2', element: <Register2 /> },
  //     { path: '/auth/forgot-password', element: <ForgotPassword /> },
  //     { path: '/auth/forgot-password2', element: <ForgotPassword2 /> },
  //     { path: '/auth/two-steps', element: <TwoSteps /> },
  //     { path: '/auth/two-steps2', element: <TwoSteps2 /> },
  //     { path: '/auth/maintenance', element: <Maintenance /> },
  //     { path: '*', element: <Navigate to="/auth/404" /> },
  //   ],
  // },
];

const router = createBrowserRouter(Router);
export default router;
