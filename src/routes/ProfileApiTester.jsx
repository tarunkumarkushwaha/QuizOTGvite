import React, { useState } from "react";
import { Context } from "../MyContext";
import { useContext } from "react";

export default function ProfileApiTester() {
  const { backendURL, accessToken } = useContext(Context);

  const [loading, setLoading] = useState("");
  const [data, setData] = useState(null);
  const [activeRoute, setActiveRoute] = useState("");

  const routes = [
    {
      name: "Profile",
      path: "/profile",
    },
    {
      name: "Profile Stats",
      path: "/profile/stats",
    },
    {
      name: "My Questions",
      path: "/profile/questions",
    },
    {
      name: "My Discussions",
      path: "/profile/discussions",
    },
    {
      name: "My Results",
      path: "/profile/results",
    },
  ];

  const testRoute = async (route) => {
    if (!accessToken) {
      setData({
        error: "No access token. Please login first.",
      });
      return;
    }

    setLoading(route.path);
    setActiveRoute(route.path);
    setData(null);

    try {
      const res = await fetch(`${backendURL}${route.path}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await res.json();

      setData({
        status: res.status,
        success: res.ok,
        response: result,
      });
    } catch (error) {
      setData({
        error: error.message,
      });
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 pt-20">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-400">
            Profile API Tester
          </h1>

          <p className="text-slate-400 mt-2">
            Test your protected user profile endpoints.
          </p>
        </div>

        {/* Token status */}
        <div
          className={`mb-6 p-4 rounded-xl border ${
            accessToken
              ? "bg-green-500/10 border-green-500/30"
              : "bg-red-500/10 border-red-500/30"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">
              Authentication
            </span>

            <span
              className={
                accessToken
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {accessToken ? "✓ Token Available" : "✕ No Token"}
            </span>
          </div>

          {accessToken && (
            <p className="text-xs text-slate-500 mt-2 break-all">
              {accessToken.slice(0, 30)}...
            </p>
          )}
        </div>

        {/* Routes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {routes.map((route) => (
            <button
              key={route.path}
              onClick={() => testRoute(route)}
              disabled={loading === route.path}
              className={`
                text-left p-5 rounded-2xl border
                transition-all duration-200
                ${
                  activeRoute === route.path
                    ? "border-emerald-400 bg-emerald-500/10"
                    : "border-slate-700 bg-slate-900 hover:border-emerald-500/50"
                }
                disabled:opacity-50
              `}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-semibold">
                  {route.name}
                </span>

                {loading === route.path && (
                  <span className="text-yellow-400 text-sm">
                    Loading...
                  </span>
                )}
              </div>

              <code className="text-sm text-sky-400">
                GET {route.path}
              </code>

              <p className="text-xs text-slate-500 mt-3">
                Click to test endpoint
              </p>
            </button>
          ))}

        </div>

        {/* Response */}
        <div className="mt-8">

          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">
              API Response
            </h2>

            {activeRoute && (
              <code className="text-sm text-sky-400">
                GET {activeRoute}
              </code>
            )}
          </div>

          <div className="bg-black border border-slate-800 rounded-2xl p-5 min-h-[300px] overflow-auto">

            {!data ? (
              <div className="flex items-center justify-center min-h-[260px] text-slate-500">
                Select an endpoint above
              </div>
            ) : (
              <>
                {data.status && (
                  <div className="mb-4">
                    <span className="text-slate-400">
                      Status:{" "}
                    </span>

                    <span
                      className={
                        data.success
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {data.status}
                    </span>
                  </div>
                )}

                <pre className="text-sm text-green-300 whitespace-pre-wrap">
                  {JSON.stringify(
                    data.response || data,
                    null,
                    2
                  )}
                </pre>
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
