import { createContext, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DataContext = createContext({});

const API_URL = "https://azizbekaliyev.uz/api/v1/authenticate";

export const DataProvider = ({ children }) => {
  const login = () => toast.success("Login successfully. Welcome!");
  const location = useLocation();
  const [user, setUser] = useState({});
  const [blum, setBlum] = useState({});
  const [invites, setInvites] = useState([]);
  const [hour, setHour] = useState(0);
  const [value, setValue] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isloading, setisloading] = useState(true);

  const urlparams = new URLSearchParams(location.search);
  const id = urlparams.get("telegram_id");
  const uname = urlparams.get("username");
  const fname = urlparams.get("first_name");
  const av = urlparams.get("avatar");

  const getCsrfToken = useCallback(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];
    return token;
  }, []);

  const authenticate = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/enter/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        body: JSON.stringify({
          telegram_id: id,
          username: uname,
          first_name: fname,
          avatar: av,
        }),
      });

      if (!response.ok) {
        const text = await response.text(); // Read response as text if not OK
        throw new Error(
          `HTTP error! Status: ${response.status}, Response: ${text}`
        );
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log(data);
        setUser(data);
      } else {
        throw new Error(`Expected JSON, but received ${contentType}`);
      }
    } catch (error) {
      console.error("Error authenticating:", error.message); // Log detailed error message
    }
  }, [id, uname, fname, av, getCsrfToken]);

  const getBlum = useCallback(async () => {
    if (user?.telegram_id) {
      try {
        const response = await fetch(
          `${API_URL}/get_blum/${user.telegram_id}/`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch blum: ${response.statusText}`);
        }
        const data = await response.json();
        setBlum(data);
        // Update value based on the fetched data
        if (data.start_time) {
          const startDate = new Date(data.start_time);
          const now = new Date();
          const elapsed = now - startDate;
          setSeconds(elapsed);
          setValue(((elapsed / 1000) * 2) / 1000); // Update value based on elapsed time
        }
      } catch (error) {
        console.error("Error fetching blum:", error.message);
      }
    }
  }, [user]);

  const get_invites = async () => {
    const response = await fetch(`${API_URL}/get_invites/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: id,
      }),
    });
    const data = await response.json();
    setInvites(data);
    console.log(data);
  };

  useEffect(() => {
    authenticate();
    login();
    get_invites();
  }, [authenticate]);

  useEffect(() => {
    if (user.telegram_id) {
      getBlum();
      setTimeout(() => {
        setisloading(false);
      }, 3000);
    }
  }, [getBlum, user.telegram_id]);

  useEffect(() => {
    if (blum?.start_time) {
      const startDate = new Date(blum.start_time);
      const now = new Date();
      const elapsed = now - startDate;
      setHour(Math.floor(elapsed / (1000 * 60 * 60)));
      setSeconds(elapsed);
      setValue(((elapsed / 1000) * 2) / 1000);
    }
  }, [blum, hour, value]);

  const start_farming = async () => {
    try {
      const response = await fetch(`${API_URL}/start_farming/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.telegram_id,
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to start farming: ${response.statusText}`);
      }
      await response.json();
      await getBlum();
    } catch (error) {
      console.error("Error starting farming:", error.message);
    }
  };

  const check_blum = async () => {
    const response = await fetch(`${API_URL}/check_blum/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await response.json();
  };

  const daily_reward_claimer = async () => {
    const response = await fetch(`${API_URL}/daily_reward/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await response.json();
    await getBlum();
  };

  const claim_hander = async () => {
    const response = await fetch(`${API_URL}/claim/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    const data = await response.json();
    await getBlum();
    await check_blum();
  };

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        blum,
        setBlum,
        authenticate,
        hour,
        setHour,
        start_farming,
        seconds,
        setSeconds,
        value,
        setValue,
        check_blum,
        daily_reward_claimer,
        claim_hander,
        getBlum,
        login,
        ToastContainer,
        invites,
        isloading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
