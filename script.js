document.addEventListener("DOMContentLoaded", function () {
        // -------------------------------
        // Mobile Menu Toggle
        // -------------------------------
        const mobileBtn = document.getElementById("mobileMenuBtn");
        const mobileNav = document.getElementById("mobileNav");
        let mobileOpen = false;

        if (mobileBtn && mobileNav) {
          mobileBtn.addEventListener("click", () => {
            mobileOpen = !mobileOpen;
            mobileNav.style.display = mobileOpen ? "flex" : "none";
            mobileNav.setAttribute("aria-hidden", !mobileOpen);
          });

          function handleResize() {
            if (window.innerWidth >= 768) {
              mobileNav.style.display = "none";
              mobileOpen = false;
            }
          }

          window.addEventListener("resize", handleResize);
          handleResize();
        }

        // -------------------------------
        // Appointment Overlay & Form Submission
        // -------------------------------
        const overlay = document.getElementById("appointmentOverlay");
        const openButtons = document.querySelectorAll(".btn-book-appointment");
        const closeBtn = document.getElementById("closeAppointment");
        const overlayForm = overlay.querySelector(".book-form");
        const toast = document.getElementById("toastNotification");

        const TRANSITION_DURATION = 350;

        const showToast = (message) => {
          toast.textContent = message;
          toast.classList.add("visible");
          setTimeout(() => {
            toast.classList.remove("visible");
          }, 3000);
        };

        const openOverlay = () => {
          overlay.style.display = "flex";
          setTimeout(() => {
            overlay.classList.add("show");
          }, 10);
        };

        const closeOverlay = () => {
          overlay.classList.remove("show");
          setTimeout(() => {
            overlay.style.display = "none";
          }, TRANSITION_DURATION);
        };

        if (openButtons.length > 0) {
          openButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
              e.preventDefault();
              openOverlay();
            });
          });
        }

        if (closeBtn) {
          closeBtn.addEventListener("click", closeOverlay);
        }

        if (overlay) {
          overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
              closeOverlay();
            }
          });
        }

        if (overlayForm) {
          overlayForm.addEventListener("submit", function (e) {
            e.preventDefault();
            closeOverlay();
            showToast("Your appointment has been successfully requested!");
            overlayForm.reset();
          });
        }
      });