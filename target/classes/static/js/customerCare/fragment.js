$(document).ready(function () {

$(function () {
        // Get last active fragment from localStorage
        const lastPage = localStorage.getItem("lastActivePage");

        if (lastPage) {
            loadFragment(lastPage); // Load previously active fragment
        } else {
            loadFragment("requestData"); // Load default fragment
        }
    });

// Main function to load and initialize fragment
function loadFragment(pageName) {
        var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
        var departmentName = departmentElement.data("departmentname");//it
        // Save page name to localStorage
        localStorage.setItem("lastActivePage", pageName);

        const container = document.getElementById("customerCareContainer");
        container.innerHTML = "<p>Loading...</p>";
        const url = `/fragment/${pageName}?folder=${encodeURIComponent("customerCare")}&departmentName=${encodeURIComponent(departmentName)}`;

        fetch(url)
            .then(response => response.text())
            .then(html => {
                container.innerHTML = html;

                    const fragmentInitializers = {
                        requestData: [window.initRequestDataTable, window.initRequestDataGeneral ,window.initGlobalDivToggle],
                        serviceRequestPending: [window.initServiceRequestPendingGeneral,window.initGlobalDivToggle],
                        serviceRequest: [window.initServiceRequestGeneral,window.initGlobalDivToggle],
                        deviceInformation: [window.initDeviceInformationGeneral,window.initGlobalDivToggle],
                        // Add more as needed
                    };
                  const initFun = fragmentInitializers[pageName];
                    if (Array.isArray(initFun)) {
                        initFun.forEach(fn => {
                            if (typeof fn === "function") {
                                fn();
                            }
                        });
                    } else if (typeof initFuncs === "function") {
                        // For backward compatibility
                        initFun();
                    }

                // Optional: general fragment initialization
                if (typeof window.initFragment === "function") {
                    window.initFragment(pageName);
                }
            })
            .catch(error => {
                console.error("Error loading fragment:", error);
                container.innerHTML = "<p>Error loading content.</p>";
            });
    }
// Expose globally for use elsewhere (e.g., in nav click handlers)
window.toggleListItem = loadFragment;
window.toggleListItem = function (item, pageName) {
        var departmentElement = $(".departmentName"); // Assuming you set a unique ID for the `<a>` element
        var departmentName = departmentElement.data("departmentname");//it
        localStorage.setItem("lastActivePage", pageName);

        const container = document.getElementById("customerCareContainer");
        container.innerHTML = "<p>Loading...</p>";
        const url = `/fragment/${pageName}?folder=${encodeURIComponent("customerCare")}&departmentName=${encodeURIComponent(departmentName)}`;

        fetch(url)
          .then(response => response.text())
          .then(html => {
            container.innerHTML = html;
            // Page-specific initializers map
             const fragmentInitializers = {
                requestData: [window.initRequestDataTable, window.initRequestDataGeneral ,window.initGlobalDivToggle],
                serviceRequestPending: [window.initServiceRequestPendingGeneral,window.initGlobalDivToggle],
                serviceRequest: [window.initServiceRequestGeneral,window.initGlobalDivToggle],
                deviceInformation: [window.initDeviceInformationGeneral,window.initGlobalDivToggle],
                // Add more as needed
            };
          const initFun = fragmentInitializers[pageName];
           if (Array.isArray(initFun)) {
               initFun.forEach(fn => {
                   if (typeof fn === "function") {
                       fn();
                   }
               });
           } else if (typeof initFuncs === "function") {
               // For backward compatibility
               initFun();
           }

            // Optional: General fragment init
            if (typeof window.initFragment === "function") {
              window.initFragment(pageName);
            }

          })
          .catch(error => {
            console.error("Error loading fragment:", error);
            container.innerHTML = "<p>Error loading content.</p>";
          });

    };

// Adjust styles on window resize
});
