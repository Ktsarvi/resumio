import React from "react";
import { Check, X } from "lucide-react";

const Premium = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        { name: "Basic resume templates", included: true },
        { name: "Basic customization", included: true },
        { name: "AI-powered suggestions", included: false },
        { name: "Premium templates", included: false },
        { name: "Priority support", included: false },
      ],
      cta: "Get Started",
      ctaLink: "/",
      popular: false,
    },
    {
      name: "Pro",
      price: "$11.99",
      period: "per month",
      description: "Best for professionals",
      features: [
        { name: "All resume templates", included: true },
        { name: "Advanced customization", included: true },
        { name: "AI-powered suggestions", included: true },
        { name: "Premium templates", included: true },
        { name: "Priority support", included: true },
      ],
      cta: "Start your journey",
      ctaLink: "/",
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="text-center px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
          Choose Your
          <span className="bg-linear-to-r from-purple-700 to-purple-600 bg-clip-text text-transparent ml-2">
            Perfect Plan
          </span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          Start building professional resumes today. Upgrade anytime to unlock
          premium features.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, planIndex) => (
            <div
              key={planIndex}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "bg-linear-to-br from-purple-600 to-purple-700 text-white ring-4 ring-purple-600 ring-offset-4 shadow-2xl transform scale-105"
                  : "bg-white text-gray-900 shadow-lg border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-linear-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    The Best one
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3
                  className={`text-2xl font-bold ${
                    plan.popular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-2 ${
                    plan.popular ? "text-purple-100" : "text-gray-600"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mt-6">
                  <span
                    className={`text-5xl font-bold ${
                      plan.popular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-lg ${
                      plan.popular ? "text-purple-100" : "text-gray-600"
                    }`}
                  >
                    /{plan.period}
                  </span>
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="shrink-0">
                      {feature.included ? (
                        <Check
                          className={`h-6 w-6 ${
                            plan.popular ? "text-purple-200" : "text-purple-600"
                          }`}
                          aria-hidden="true"
                        />
                      ) : (
                        <X
                          className={`h-6 w-6 ${
                            plan.popular ? "text-purple-300" : "text-gray-400"
                          }`}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <span
                      className={`ml-3 ${
                        feature.included ? "" : "line-through opacity-60"
                      } ${plan.popular ? "text-white" : "text-gray-700"}`}
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  onClick={async () => {
                    if (plan.name === "Pro") {
                      try {
                        const response = await fetch(
                          "http://localhost:3000/create-checkout-session",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              item: [{ id: 1, quantity: 1 }],
                            }),
                            credentials: "include",
                          }
                        );

                        if (!response.ok) {
                          const error = await response.json();
                          throw new Error(
                            error.message || "Something went wrong"
                          );
                        }

                        const { url } = await response.json();
                        window.location.href = url;
                      } catch (error) {
                        console.error("Checkout error:", error);
                        // You might want to show an error message to the user here
                        alert("Failed to start checkout. Please try again.");
                      }
                    } else {
                      // Handle free plan selection
                      window.location.href = plan.ctaLink;
                    }
                  }}
                  className={`block w-full text-center rounded-full px-6 py-3 font-semibold transition-all duration-200 active:scale-95 ${
                    plan.popular
                      ? "bg-white text-purple-600 hover:bg-purple-50 shadow-lg"
                      : "bg-purple-600 text-white hover:bg-purple-700 ring-2 ring-purple-600 ring-offset-2"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-r from-purple-600 to-purple-700 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to create your professional resume?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join professionals who have built their careers with our platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Premium;

// const button = document.querySelector("button");
// button.addEventListener("click", () => {
//   fetch("http://localhost:5173/create-checkout-session", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       items: [
//         {
//           id: 1,
//           quantity: 1,
//         },
//       ],
//     }),
//   })
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         return res.json().then((json) => Promise.reject(json));
//       }
//     })
//     .then(({ url }) => {
//       window.location = url;
//     })
//     .catch((e) => {
//       console.error(e.error);
//     });
// });
