import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'

import { useCustomNavigate, useSize } from "Components/CustomHooks";
import { handleBearerToken, handleClearErrors, handleOnlineOffilne, handleScreenSize } from "Actions/Common_actions/Common_action";
import Layout from "Views/Main/Layout/Layout";
import LoadDetails from "Views/Main/Pages/LoadDetails";
import TruckDetails from "Views/Main/Pages/TruckDetails";
import DriverDetails from "Views/Main/Pages/DriverDetails";
import BuySellDetails from "Views/Main/Pages/BuySellDetails";
import Dashboard from "Views/Main/Pages/Dashboard";
import Crm from "Views/Main/Pages/Crm";
import Feedback from "Views/Main/Pages/Feedback";
import UserProfileDetails from "Views/Main/Pages/UserProfileDetails";
import Blog from "Views/Main/Pages/Blog";
import { OverallModel } from "Views/Common/OverallModal";
import Login from "Views/Common/Login";
import Error from "Views/Common/error";
import { Analytics } from "Views/Main/Pages/Analytics";


const App = () => {
  const { isOnline, Err, Toast_Type } = useSelector((state) => state.commonState);
  const sizer = useSize();
  const dispatch = useDispatch();
  const navigate = useCustomNavigate();

  //initial state
  useEffect(() => {
    dispatch(handleOnlineOffilne(navigator.onLine))
    dispatch(handleScreenSize(sizer))
    dispatch(handleBearerToken(Cookies.get("token")))
  }, [])

  //error state
  useEffect(() => {
    if (Err) {
      toast(Err, {
        position: "top-right",
        type: Toast_Type,
        onOpen: () => dispatch(handleClearErrors),
        autoClose: 1600
      })
      return
    }
  }, [Toast_Type, Err, dispatch])

  // useEffect(() => {
  //   if (!token || !user_id) {
  //     navigate("/")
  //   }
  // }, [token, user_id])

  window.addEventListener('online', () => {
    dispatch(handleOnlineOffilne(true))
  });

  window.addEventListener('offline', () => {
    dispatch(handleOnlineOffilne(false))
  });

  return isOnline ?
    <HelmetProvider>
      <ToastContainer theme='light' />
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Layout />}>
          <Route path="home">
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<UserProfileDetails />} />
          </Route>
          <Route path="analytics" element={<Analytics />} />
          <Route path="services" >
            <Route path="load_details" element={<LoadDetails />} />
            <Route path="truck_details" element={<TruckDetails />} />
            <Route path="driver_details" element={<DriverDetails />} />
            <Route path="buy_sell_details" element={<BuySellDetails />} />
            <Route path="insurance" element={<p>hi</p>} />
            <Route path="fast_tag" element={<p>hi</p>} />
          </Route>
          <Route path="blog" element={<Blog />} />
          <Route path="feedback_complaints" element={<Feedback />} />
          <Route path="crm" element={<Crm />} />
        </Route>


        {/* page not found  */}
        <Route path="*" element={<Error />} />
      </Routes>
    </HelmetProvider >
    :
    <p>No internet connection</p>
}
export default App;