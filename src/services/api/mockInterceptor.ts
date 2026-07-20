
import type { AxiosInstance } from "axios";
import {
  MOCK_NEARBY_TRANSPORT,
  MOCK_NOTIFICATIONS,
  MOCK_ROUTE_RECOMMENDATIONS,
  MOCK_TOKENS,
  MOCK_USER,
  MOCK_WALLET,
} from "./mockData";


const ENABLE_MOCK_API =
  process.env.EXPO_PUBLIC_MOCK_API === "true" || __DEV__;


export const setupMockInterceptor = (
  client: AxiosInstance
) => {

  if (!ENABLE_MOCK_API) {
    return;
  }


  client.defaults.adapter = async (config) => {

    await new Promise(resolve =>
      setTimeout(resolve,500)
    );


    const url = config.url || "";


    let data:any = null;


    if(url.includes("/auth/login")){
      data={
        user:MOCK_USER,
        tokens:MOCK_TOKENS
      };
    }


    // else if(url.includes("/transport/nearby")){
    //   data=MOCK_NEARBY_TRANSPORT;
    // }

    else if (url.includes("/transport/nearby")) {
  data = {
    data: MOCK_NEARBY_TRANSPORT,
    message: "Nearby transport loaded successfully",
    requestId: crypto.randomUUID?.() ?? Date.now().toString(),
  };
}

    else if(url.includes("/routes/recommendations")){
      data=MOCK_ROUTE_RECOMMENDATIONS;
    }


    // else if(url.includes("/profile/notifications")){
    //   data=MOCK_NOTIFICATIONS;
    // }

else if (url.includes("/profile/notifications")) {
  data = {
    data: MOCK_NOTIFICATIONS,
    message: "Notifications loaded successfully",
    requestId: crypto.randomUUID?.() ?? Date.now().toString(),
  };
}
    // else if(url.includes("/wallet")){
    //   data=MOCK_WALLET;
    // }

else if (url.includes("/wallet")) {
  data = {
    data: MOCK_WALLET,
    message: "Wallet loaded successfully",
    requestId: crypto.randomUUID?.() ?? Date.now().toString(),
  };
}
    else {
      data={};
    }


    return {
      data,
      status:200,
      statusText:"OK",
      headers:{},
      config
    };
  };
};

// import type { AxiosInstance } from 'axios';
// import { MOCK_USER, MOCK_TOKENS, MOCK_NEARBY_TRANSPORT, MOCK_ROUTE_RECOMMENDATIONS, MOCK_NOTIFICATIONS, MOCK_WALLET } from './mockData';

// const ENABLE_MOCK_API = process.env.EXPO_PUBLIC_MOCK_API === 'true' || __DEV__;

// export const setupMockInterceptor = (client: AxiosInstance) => {
//   if (!ENABLE_MOCK_API) {
//     return;
//   }

//   client.interceptors.request.use((config) => {
//     const url = config.url || '';

//     // Login/Signup endpoints
//     if (url.includes('/auth/login') || url.includes('/auth/signup')) {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           (config as any).mockResponse = {
//             status: 200,
//             data: {
//               user: MOCK_USER,
//               tokens: MOCK_TOKENS
//             }
//           };
//           resolve(config);
//         }, 1000); // Simulate 1s delay
//       });
//     }

//     // Verify OTP
//     if (url.includes('/auth/verify-otp')) {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           (config as any).mockResponse = {
//             status: 200,
//             data: {
//               user: MOCK_USER,
//               tokens: MOCK_TOKENS
//             }
//           };
//           resolve(config);
//         }, 800);
//       });
//     }

//     // Forgot password
//     if (url.includes('/auth/forgot-password')) {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           (config as any).mockResponse = {
//             status: 200,
//             data: { message: 'OTP sent to your phone' }
//           };
//           resolve(config);
//         }, 600);
//       });
//     }

//     // Nearby transport
//     if (url.includes('/transport/nearby')) {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           (config as any).mockResponse = {
//             status: 200,
//             data: MOCK_NEARBY_TRANSPORT
//           };
//           resolve(config);
//         }, 500);
//       });
//     }

//     // Route recommendations
//     if (url.includes('/routes/recommendations')) {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           (config as any).mockResponse = {
//             status: 200,
//             data: MOCK_ROUTE_RECOMMENDATIONS
//           };
//           resolve(config);
//         }, 800);
//       });
//     }

//     // Destination search
//     if (url.includes('/routes/search-destinations')) {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           (config as any).mockResponse = {
//             status: 200,
//             data: [
//               { name: 'Piazza', latitude: 9.0400, longitude: 38.7500 },
//               { name: 'Bole', latitude: 9.0450, longitude: 38.7550 },
//               { name: 'Kazanchis', latitude: 9.0310, longitude: 38.7460 },
//               { name: 'Meskel Square', latitude: 9.0330, longitude: 38.7480 }
//             ]
//           };
//           resolve(config);
//         }, 300);
//       });
//     }

//     // Notifications
//     if (url.includes('/profile/notifications')) {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           (config as any).mockResponse = {
//             status: 200,
//             data: MOCK_NOTIFICATIONS
//           };
//           resolve(config);
//         }, 400);
//       });
//     }

//     // Wallet
//     if (url.includes('/wallet')) {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           (config as any).mockResponse = {
//             status: 200,
//             data: MOCK_WALLET
//           };
//           resolve(config);
//         }, 500);
//       });
//     }

//     return config;
//   });

//   // Response interceptor for mock responses
//   client.interceptors.response.use((response) => {
//     if ((response.config as any).mockResponse) {
//       return (response.config as any).mockResponse;
//     }
//     return response;
//   });
// };
