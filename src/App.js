import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

import { useCustomNavigate, useSize } from "Components/CustomHooks";
import { handleBearerToken, handleClearErrors, handleOnlineOffilne, handleScreenSize } from "Actions/Common_actions/Common_action";
import Layout from "Views/Main/Layout/Layout";


const App = () => {
  const { isOnline, token, user_id, Err, Toast_Type } = useSelector((state) => state.commonState);
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

        {/* <Route index> */}
        <Route path="/dashboard" element={<Layout />}>
          <Route path="home" element={<p>hi</p>} />
          <Route path="analytics" element={<p>hi</p>} />

          <Route path="services" element={<p>hi</p>} >
            <Route path="load_details" element={<p>hi</p>} />
            <Route path="truck_details" element={<p>hi</p>} />
            <Route path="driver_details" element={<p>hi</p>} />
            <Route path="buy_sell_details" element={<p>hi</p>} />
            <Route path="insurance" element={<p>hi</p>} />
            <Route path="fast_tag" element={<p>hi</p>} />
          </Route>

          <Route path="blog" element={<p>hi</p>} />
          <Route path="feedback_complaints" element={<p>hi</p>} />
          <Route path="crm" element={<p>hi</p>} />
        </Route>
        {/* </Route> */}

        {/* not found  */}
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </HelmetProvider >
    :
    <p>No internet connection</p>
}
export default App;