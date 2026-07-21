import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  LogOut,
  Settings,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { signOut } from "../services/authService";


export default function UserMenu() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [open, setOpen] =
    useState(false);

  const [signingOut, setSigningOut] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);


  // --------------------------------------------------
  // Close dropdown when clicking outside
  // --------------------------------------------------

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);


  if (!user) {
    return null;
  }


  // --------------------------------------------------
  // User Details
  // --------------------------------------------------

  const name =
    user.user_metadata?.name ||
    "User";

  const email =
    user.email || "";

  const initial =
    name
      .trim()
      .charAt(0)
      .toUpperCase() || "U";


  // --------------------------------------------------
  // Sign Out
  // --------------------------------------------------

  async function handleSignOut() {
    try {
      setSigningOut(true);

      await signOut();

      navigate(
        "/login",
        {
          replace: true,
        }
      );

    } catch (error) {

      console.error(
        "Failed to sign out:",
        error
      );

    } finally {

      setSigningOut(false);

    }
  }


  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div
      ref={menuRef}
      className="relative"
    >

      {/* ==================================================
          Circular Profile Button
      ================================================== */}

      <button
        type="button"
        onClick={() =>
          setOpen(
            (previous) => !previous
          )
        }
        aria-label="Open account menu"
        aria-expanded={open}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-zinc-700
          bg-zinc-900
          text-sm
          font-semibold
          text-white
          transition
          hover:border-zinc-500
          hover:bg-zinc-800
          focus:outline-none
          focus:ring-2
          focus:ring-zinc-600
        "
      >
        {initial}
      </button>


      {/* ==================================================
          Dropdown
      ================================================== */}

      {open && (
        <div
          className="
            absolute
            right-0
            z-50
            mt-3
            w-64
            overflow-hidden
            rounded-xl
            border
            border-zinc-800
            bg-zinc-900
            shadow-2xl
          "
        >

          {/* ==============================================
              User Information
          ============================================== */}

          <div
            className="
              border-b
              border-zinc-800
              px-4
              py-4
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-sm
                  font-semibold
                  text-zinc-950
                "
              >
                {initial}
              </div>


              <div className="min-w-0">

                <p
                  className="
                    truncate
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  {name}
                </p>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-xs
                    text-zinc-400
                  "
                >
                  {email}
                </p>

              </div>

            </div>

          </div>


          {/* ==============================================
              Menu Options
          ============================================== */}

          <div className="p-2">

            {/* Settings */}

            <button
              type="button"
              onClick={() => {
                setOpen(false);

                navigate(
                  "/settings"
                );
              }}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                px-3
                py-2.5
                text-left
                text-sm
                text-zinc-300
                transition
                hover:bg-zinc-800
                hover:text-white
              "
            >

              <Settings
                size={17}
              />

              Settings

            </button>


            {/* Divider */}

            <div
              className="
                my-1
                border-t
                border-zinc-800
              "
            />


            {/* Sign Out */}

            <button
              type="button"
              onClick={
                handleSignOut
              }
              disabled={
                signingOut
              }
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                px-3
                py-2.5
                text-left
                text-sm
                text-red-400
                transition
                hover:bg-zinc-800
                hover:text-red-300
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              <LogOut
                size={17}
              />

              {signingOut
                ? "Signing out..."
                : "Sign out"}

            </button>

          </div>

        </div>
      )}

    </div>
  );
}