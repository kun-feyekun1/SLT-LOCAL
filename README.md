# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.




<!-- my notes -->
<!-- provider structure most used -->
<App>
GestureHandlerRootView

    ThemeProvider

        AuthProvider

            Redux Provider

                ReactQueryProvider

                    LocalizationProvider

                        NotificationProvider

                            BottomSheetProvider

                                ErrorBoundary

                                    Expo Router


 Each provider has a single responsibility:

ThemeProvider → colors, typography, spacing mode (light/dark)
AuthProvider → current user and authentication state
LocationProvider → live GPS location and permissions
NotificationProvider → push notification state
ReactQueryProvider → server data fetching and caching
Redux Provider → global application state
GestureHandlerRootView → gesture support

</App>

⬜ Light background

⬜ White card

🟦 Primary button

🟩 Success badge

⚫ Black text

| Provider             | Purpose                               | Needed now? |
| -------------------- | ------------------------------------- | :---------: |
| ✅ ThemeProvider      | Light/dark theme, design system       |     Yes     |
| ✅ ReduxProvider      | Global app state                      |     Yes     |
| ✅ QueryProvider      | API caching (React Query)             |     Yes     |
| ✅ AuthProvider       | Login/logout, current user            |     Yes     |
| NotificationProvider | Push notifications                    |    Later    |
| LocationProvider     | Live GPS and permissions              |    Later    |
| NetworkProvider      | Online/offline monitoring             |    Later    |
| BottomSheetProvider  | Global bottom sheets                  |    Later    |
| ModalProvider        | Global modal management               |    Later    |
| PermissionProvider   | Camera, location, storage permissions |    Later    |
| AnalyticsProvider    | Firebase/Mixpanel/etc.                |    Later    |
| FeatureFlagProvider  | Enable/disable features               |    Later    |
| LocalizationProvider | Multiple languages                    |    Later    |




with Expo Router, every screen that we want to navigate to through a URL-style route must have a route file inside the app/ folder.
However, the important enterprise pattern is:
The app/ folder contains the route entry points, while the actual screen UI lives inside src/features.
So we do not put our entire screen implementation inside app/.

Routes are not equal to screens.
A small route tree with a large feature layer is actually a sign of a mature architecture.
For Derash, I would aim for roughly:

50 routes
200+ feature screens/components
100+ reusable design-system components

That is a structure capable of growing into a nationwide transportation platform.

A professional Derash architecture:

app/
├── (auth)          ~8 routes
├── (tabs)          ~6 routes
├── trip            ~5 routes
├── transport       ~5 routes
├── driver          ~8 routes
├── wallet          ~4 routes
├── settings        ~4 routes
└── other           ~10 routes

≈50 routes

Below is a professional exact 200 feature screen structure.

Structure:

src/features/
1. Authentication (12)
auth/screens/

WelcomeScreen
OnboardingScreen
LoginScreen
RegisterScreen
PhoneLoginScreen
OTPVerificationScreen
CreateProfileScreen
IdentityVerificationScreen
PermissionRequestScreen
AccountCreatedScreen
ForgotPasswordScreen
ResetPasswordScreen
2. Passenger Home (12)
home/screens/

PassengerHomeScreen
HomeMapScreen
NearbyTransportScreen
QuickBookingScreen
RecentTripsScreen
FavoriteRoutesPreviewScreen
TransportRecommendationScreen
ServiceAlertScreen
CityOverviewScreen
PopularRoutesScreen
NearbyStationPreviewScreen
HomeSearchScreen
3. Location & Map (15)
map/screens/

LiveMapScreen
FullMapScreen
SearchLocationScreen
SelectPickupScreen
SelectDestinationScreen
NearbyStationsMapScreen
VehicleTrackingMapScreen
RouteMapScreen
TrafficMapScreen
HeatMapScreen
SavedLocationsScreen
LocationPermissionScreen
GPSUnavailableScreen
OfflineMapScreen
MapSettingsScreen
4. Transport Discovery (12)
transport/screens/

NearbyVehiclesScreen
VehicleDetailsScreen
BusDetailsScreen
MinibusDetailsScreen
TaxiDetailsScreen
VehicleCapacityScreen
VehicleStatusScreen
VehicleArrivalScreen
VehicleScheduleScreen
TransportTypeSelectionScreen
VehicleHistoryScreen
TransportFeedbackScreen
5. Routes Management (15)
routes/screens/

RouteSearchScreen
RouteListScreen
RouteDetailsScreen
RouteStopsScreen
RouteScheduleScreen
RouteDirectionScreen
RouteMapPreviewScreen
RouteFareScreen
RouteComparisonScreen
FavoriteRoutesScreen
RecentRoutesScreen
RouteAvailabilityScreen
RouteDelayScreen
RouteAlternativeScreen
RouteFeedbackScreen
6. Stations (12)
stations/screens/

StationListScreen
StationDetailsScreen
StationArrivalScreen
StationDepartureScreen
StationMapScreen
StationServicesScreen
StationFacilitiesScreen
StationCrowdLevelScreen
StationFavoritesScreen
StationSearchScreen
StationReportScreen
StationFeedbackScreen
7. Trip Management (20)
trip/screens/

TripPlanningScreen
DestinationSearchScreen
RouteSelectionScreen
VehicleSelectionScreen
FareCalculationScreen
TripConfirmationScreen
TripPaymentScreen
TripSearchingScreen
TripStartedScreen
ActiveTripScreen
TripTrackingScreen
TripProgressScreen
TripCompletedScreen
TripReceiptScreen
TripHistoryScreen
TripDetailsScreen
TripCancellationScreen
TripRebookingScreen
TripRatingScreen
TripIssueScreen
8. Ticket System (12)
ticket/screens/

TicketHomeScreen
BuyTicketScreen
TicketSelectionScreen
TicketDetailsScreen
QRCodeTicketScreen
TicketScannerScreen
TicketValidationScreen
TicketHistoryScreen
TicketRefundScreen
TicketTransferScreen
TicketSuccessScreen
TicketFailedScreen
9. Wallet & Payment (15)
wallet/screens/

WalletHomeScreen
BalanceScreen
AddMoneyScreen
PaymentMethodsScreen
AddPaymentMethodScreen
TransactionHistoryScreen
TransactionDetailsScreen
PaymentConfirmationScreen
PaymentSuccessScreen
PaymentFailedScreen
ReceiptScreen
MobileMoneyScreen
BankPaymentScreen
PromoCodeScreen
PaymentSettingsScreen
10. Driver Platform (20)
driver/screens/

DriverDashboardScreen
DriverOnlineScreen
DriverOfflineScreen
DriverTripRequestScreen
PassengerRequestDetailsScreen
AcceptTripScreen
RejectTripScreen
AssignedRouteScreen
DriverNavigationScreen
DriverActiveTripScreen
DriverTripCompleteScreen
DriverTripHistoryScreen
DriverEarningsScreen
DriverPerformanceScreen
DriverRatingScreen
DriverWalletScreen
DriverNotificationScreen
DriverSupportScreen
DriverTrainingScreen
DriverSettingsScreen
11. Vehicle Management (12)
vehicle/screens/

MyVehicleScreen
VehicleRegistrationScreen
VehicleDocumentsScreen
VehicleInsuranceScreen
VehicleInspectionScreen
VehicleMaintenanceScreen
VehicleRepairHistoryScreen
VehicleFuelScreen
VehicleTrackingScreen
VehicleSettingsScreen
VehicleReportScreen
VehicleComplianceScreen
12. Profile & Account (12)
profile/screens/

ProfileScreen
EditProfileScreen
PersonalInfoScreen
SecurityScreen
PrivacyScreen
LanguageScreen
ThemeScreen
NotificationSettingsScreen
SavedPlacesScreen
EmergencyContactsScreen
AccountActivityScreen
DeleteAccountScreen
13. Notifications (8)
notifications/screens/

NotificationCenterScreen
NotificationDetailsScreen
TransportAlertsScreen
TripAlertsScreen
PaymentAlertsScreen
SystemAnnouncementsScreen
EmergencyAlertsScreen
NotificationSettingsScreen
14. Support & Safety (12)
support/screens/

HelpCenterScreen
FAQScreen
ContactSupportScreen
ComplaintScreen
ReportIssueScreen
LostFoundScreen
EmergencyScreen
SafetyCenterScreen
FeedbackScreen
ChatSupportScreen
TermsScreen
PrivacyPolicyScreen
15. City Expansion Module (10)
city/screens/

CitySelectionScreen
CityDashboardScreen
CityTransportOverviewScreen
CityRoutesScreen
CityStationsScreen
CityScheduleScreen
CityAnnouncementsScreen
CityStatisticsScreen
CityServiceAreaScreen
CityComparisonScreen



src/features/

auth                 10
onboarding            8
home                 10
map                  14
transport            10
routes               14
stations             10
trip                 18
ticket               10
wallet               12
payment               8
driver               18
fleet-management     10
vehicle-management    8
profile              10
notifications         8
support               10
safety                6
city                 10
settings              6

TOTAL               200






features/*/components (Feature components)

This is where most of our components go.
Each feature has its own components.

Example:

src/features/trip/

├── screens/
│   ├── TripPlanningScreen.tsx
│   ├── ActiveTripScreen.tsx
│   └── TripHistoryScreen.tsx
│
├── components/
│   ├── TripCard/
│   ├── FareBreakdown/
│   ├── RouteTimeline/
│   ├── TripStatusBadge/
│   ├── PassengerCount/
│   └── DriverInfoCard/
│
├── hooks/
│   ├── useTrip.ts
│   └── useTripTracking.ts
│
├── services/
│   └── tripService.ts
│
├── store/
│   └── tripSlice.ts
│
└── types/
    └── trip.types.ts