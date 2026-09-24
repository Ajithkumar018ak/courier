/* =========================================================
   NEXORA EXPRESS — MAIN JAVASCRIPT
   Vanilla JavaScript Only
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =========================================================
       ELEMENTS
    ========================================================= */

    const body = document.body;

    const preloader = document.getElementById("preloader");
    const loadingPercent = document.getElementById("loadingPercent");

    const siteHeader = document.getElementById("siteHeader");

    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mobileOverlay = document.getElementById("mobileOverlay");
    const mobileDrawer = document.getElementById("mobileDrawer");
    const drawerClose = document.getElementById("drawerClose");

    const loginModal = document.getElementById("loginModal");
    const loginModalClose = document.getElementById("loginModalClose");

    const servicePrev = document.getElementById("servicePrev");
    const serviceNext = document.getElementById("serviceNext");
    const serviceCurrent = document.getElementById("serviceCurrent");
    const serviceProgress = document.getElementById("serviceProgress");

    const backToTop = document.getElementById("backToTop");

    const newsletterForm = document.getElementById("newsletterForm");
    const newsletterEmail = document.getElementById("newsletterEmail");
    const newsletterMessage = document.getElementById("newsletterMessage");


    /* =========================================================
       PRELOADER
    ========================================================= */

    function startPreloader() {

        if (!preloader) return;

        let progress = 0;

        const progressTimer = setInterval(() => {

            progress += Math.floor(Math.random() * 8) + 3;

            if (progress >= 100) {
                progress = 100;
                clearInterval(progressTimer);
            }

            if (loadingPercent) {
                loadingPercent.textContent = progress + "%";
            }

        }, 80);

        window.addEventListener("load", () => {

            setTimeout(() => {

                if (loadingPercent) {
                    loadingPercent.textContent = "100%";
                }

                preloader.classList.add("loaded");
                body.classList.remove("preloader-active");

                setTimeout(() => {
                    preloader.style.display = "none";
                }, 900);

            }, 400);

        });

        /* Safety fallback */
        setTimeout(() => {

            if (!preloader.classList.contains("loaded")) {

                if (loadingPercent) {
                    loadingPercent.textContent = "100%";
                }

                preloader.classList.add("loaded");
                body.classList.remove("preloader-active");

                setTimeout(() => {
                    preloader.style.display = "none";
                }, 900);
            }

        }, 5000);
    }

    body.classList.add("preloader-active");
    startPreloader();


    /* =========================================================
       MOBILE DRAWER
    ========================================================= */

    function openMobileDrawer() {

        if (!mobileDrawer || !mobileOverlay) return;

        mobileDrawer.classList.add("open");
        mobileDrawer.classList.add("active");

        mobileOverlay.classList.add("open");
        mobileOverlay.classList.add("active");

        body.classList.add("drawer-open");
        body.classList.add("no-scroll");

        if (mobileMenuButton) {
            mobileMenuButton.classList.add("active");
            mobileMenuButton.setAttribute("aria-expanded", "true");
        }
    }


    function closeMobileDrawer() {

        if (!mobileDrawer || !mobileOverlay) return;

        mobileDrawer.classList.remove("open");
        mobileDrawer.classList.remove("active");

        mobileOverlay.classList.remove("open");
        mobileOverlay.classList.remove("active");

        body.classList.remove("drawer-open");
        body.classList.remove("no-scroll");

        if (mobileMenuButton) {
            mobileMenuButton.classList.remove("active");
            mobileMenuButton.setAttribute("aria-expanded", "false");
        }
    }


    if (mobileMenuButton) {
        mobileMenuButton.addEventListener("click", openMobileDrawer);
    }

    if (drawerClose) {
        drawerClose.addEventListener("click", closeMobileDrawer);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener("click", closeMobileDrawer);
    }


    /* Close drawer when navigation link is clicked */

    document.querySelectorAll(".drawer-link, .drawer-logo").forEach(link => {

        link.addEventListener("click", () => {
            closeMobileDrawer();
        });

    });


    /* =========================================================
       LOGIN MODAL
    ========================================================= */

    function openLoginModal() {

        if (!loginModal) return;

        closeMobileDrawer();

        loginModal.classList.add("active");
        loginModal.classList.add("open");

        loginModal.setAttribute("aria-hidden", "false");

        body.classList.add("modal-open");
        body.classList.add("no-scroll");

        setTimeout(() => {

            const firstInput = loginModal.querySelector(
                ".login-form.active input"
            );

            if (firstInput) {
                firstInput.focus();
            }

        }, 250);
    }


    function closeLoginModal() {

        if (!loginModal) return;

        loginModal.classList.remove("active");
        loginModal.classList.remove("open");

        loginModal.setAttribute("aria-hidden", "true");

        body.classList.remove("modal-open");
        body.classList.remove("no-scroll");
    }


    /* All login open buttons */

    document.querySelectorAll("[data-login-open]").forEach(button => {

        button.addEventListener("click", openLoginModal);

    });


    if (loginModalClose) {
        loginModalClose.addEventListener("click", closeLoginModal);
    }


    /* Close modal when clicking outside */

    if (loginModal) {

        loginModal.addEventListener("click", event => {

            if (event.target === loginModal) {
                closeLoginModal();
            }

        });

    }


    /* =========================================================
       ESCAPE KEY
    ========================================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMobileDrawer();
            closeLoginModal();

        }

    });


    /* =========================================================
       LOGIN TABS
    ========================================================= */

    const loginTabs = document.querySelectorAll("[data-login-tab]");
    const loginForms = document.querySelectorAll("[data-login-form]");

    loginTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const selectedTab = tab.dataset.loginTab;

            loginTabs.forEach(item => {
                item.classList.remove("active");
            });

            tab.classList.add("active");


            loginForms.forEach(form => {

                form.classList.remove("active");

                if (form.dataset.loginForm === selectedTab) {
                    form.classList.add("active");
                }

            });


            const loginTitle = document.getElementById("loginTitle");

            if (loginTitle) {

                if (selectedTab === "admin") {
                    loginTitle.textContent = "Admin access";
                } else {
                    loginTitle.textContent = "Sign in to NEXORA";
                }

            }

        });

    });


    /* =========================================================
       PASSWORD SHOW / HIDE
    ========================================================= */

    document.querySelectorAll("[data-password-toggle]").forEach(button => {

        button.addEventListener("click", () => {

            const targetId = button.dataset.passwordToggle;
            const input = document.getElementById(targetId);

            if (!input) return;

            const icon = button.querySelector("i");

            if (input.type === "password") {

                input.type = "text";

                button.setAttribute(
                    "aria-label",
                    "Hide password"
                );

                if (icon) {
                    icon.classList.remove("fa-eye");
                    icon.classList.add("fa-eye-slash");
                }

            } else {

                input.type = "password";

                button.setAttribute(
                    "aria-label",
                    "Show password"
                );

                if (icon) {
                    icon.classList.remove("fa-eye-slash");
                    icon.classList.add("fa-eye");
                }

            }

        });

    });


    /* =========================================================
       SERVICES CAROUSEL
    ========================================================= */

    const serviceSlides = document.querySelectorAll(".service-slide");

    let currentService = 0;
    let serviceAutoPlay;


    function updateServiceCarousel() {

        if (!serviceSlides.length) return;

        serviceSlides.forEach((slide, index) => {

            slide.classList.toggle(
                "active",
                index === currentService
            );

        });


        if (serviceCurrent) {

            serviceCurrent.textContent =
                String(currentService + 1).padStart(2, "0");

        }


        if (serviceProgress) {

            const percentage =
                ((currentService + 1) / serviceSlides.length) * 100;

            serviceProgress.style.width = percentage + "%";

        }

    }


    function showNextService() {

        if (!serviceSlides.length) return;

        currentService++;

        if (currentService >= serviceSlides.length) {
            currentService = 0;
        }

        updateServiceCarousel();

    }


    function showPreviousService() {

        if (!serviceSlides.length) return;

        currentService--;

        if (currentService < 0) {
            currentService = serviceSlides.length - 1;
        }

        updateServiceCarousel();

    }


    if (serviceNext) {

        serviceNext.addEventListener("click", () => {

            showNextService();
            restartServiceAutoplay();

        });

    }


    if (servicePrev) {

        servicePrev.addEventListener("click", () => {

            showPreviousService();
            restartServiceAutoplay();

        });

    }


    function startServiceAutoplay() {

        if (serviceSlides.length <= 1) return;

        serviceAutoPlay = setInterval(() => {

            showNextService();

        }, 6000);

    }


    function restartServiceAutoplay() {

        clearInterval(serviceAutoPlay);
        startServiceAutoplay();

    }


    updateServiceCarousel();
    startServiceAutoplay();


    /* =========================================================
       PAUSE CAROUSEL ON HOVER
    ========================================================= */

    const servicesCarousel =
        document.getElementById("servicesCarousel");

    if (servicesCarousel) {

        servicesCarousel.addEventListener("mouseenter", () => {
            clearInterval(serviceAutoPlay);
        });

        servicesCarousel.addEventListener("mouseleave", () => {
            startServiceAutoplay();
        });

    }


    /* =========================================================
       TOUCH SWIPE FOR CAROUSEL
    ========================================================= */

    let touchStartX = 0;
    let touchEndX = 0;

    if (servicesCarousel) {

        servicesCarousel.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0].screenX;

            },
            { passive: true }
        );


        servicesCarousel.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0].screenX;

                const difference =
                    touchStartX - touchEndX;

                if (Math.abs(difference) > 50) {

                    if (difference > 0) {
                        showNextService();
                    } else {
                        showPreviousService();
                    }

                    restartServiceAutoplay();
                }

            },
            { passive: true }
        );

    }


    /* =========================================================
       HEADER SCROLL EFFECT
    ========================================================= */

    function handleHeaderScroll() {

        if (!siteHeader) return;

        if (window.scrollY > 40) {

            siteHeader.classList.add("scrolled");

        } else {

            siteHeader.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =========================================================
       BACK TO TOP
    ========================================================= */

    function handleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 600) {

            backToTop.classList.add("show");
            backToTop.classList.add("active");

        } else {

            backToTop.classList.remove("show");
            backToTop.classList.remove("active");

        }

    }


    window.addEventListener(
        "scroll",
        handleBackToTop,
        { passive: true }
    );


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================================================
       REVEAL ANIMATIONS
    ========================================================= */

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-right"
    );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("is-visible");
                            entry.target.classList.add("visible");

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("is-visible");

        });

    }


    /* =========================================================
       RIPPLE EFFECT
    ========================================================= */

    document.querySelectorAll(".ripple-btn").forEach(button => {

        button.addEventListener("click", function(event) {

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple-effect");

            const rect =
                this.getBoundingClientRect();

            const size =
                Math.max(rect.width, rect.height);

            ripple.style.width = size + "px";
            ripple.style.height = size + "px";

            ripple.style.left =
                (event.clientX - rect.left - size / 2) + "px";

            ripple.style.top =
                (event.clientY - rect.top - size / 2) + "px";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 650);

        });

    });


    /* =========================================================
       MAGNETIC BUTTON EFFECT
    ========================================================= */

    document.querySelectorAll(".magnetic-btn").forEach(button => {

        button.addEventListener("mousemove", event => {

            if (window.innerWidth < 900) return;

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX - rect.left - rect.width / 2;

            const y =
                event.clientY - rect.top - rect.height / 2;

            button.style.transform =
                `translate(${x * 0.08}px, ${y * 0.08}px)`;

        });


        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });


    /* =========================================================
       NEWSLETTER
    ========================================================= */

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", event => {

            event.preventDefault();

            if (!newsletterEmail || !newsletterMessage) {
                return;
            }

            const email =
                newsletterEmail.value.trim();

            if (!email) {

                newsletterMessage.textContent =
                    "Please enter your email address.";

                newsletterMessage.className = "error";

                newsletterEmail.focus();

                return;
            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                newsletterMessage.textContent =
                    "Please enter a valid email address.";

                newsletterMessage.className = "error";

                newsletterEmail.focus();

                return;
            }


            newsletterMessage.textContent =
                "You're subscribed to NEXORA updates.";

            newsletterMessage.className = "success";

            newsletterEmail.value = "";

        });

    }


    /* =========================================================
       LOGIN FORM VALIDATION
    ========================================================= */

    document.querySelectorAll(".login-form").forEach(form => {

        form.addEventListener("submit", event => {

            event.preventDefault();

            const submitButton =
                form.querySelector(".login-submit");

            if (!submitButton) return;


            const inputs =
                form.querySelectorAll("input[required]");

            let valid = true;


            inputs.forEach(input => {

                input.classList.remove("input-error");

                if (!input.value.trim()) {

                    input.classList.add("input-error");
                    valid = false;

                }

                if (
                    input.type === "email" &&
                    input.value.trim()
                ) {

                    const emailPattern =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                    if (!emailPattern.test(input.value)) {

                        input.classList.add("input-error");
                        valid = false;

                    }

                }

            });


            if (!valid) {

                return;

            }


            const originalText =
                submitButton.innerHTML;

            submitButton.innerHTML =
                `<i class="fa-solid fa-spinner fa-spin"></i> Signing in...`;

            submitButton.disabled = true;


            setTimeout(() => {

                submitButton.innerHTML =
                    originalText;

                submitButton.disabled = false;

                closeLoginModal();

            }, 1200);

        });

    });


    /* =========================================================
       INPUT ERROR CLEAR
    ========================================================= */

    document.querySelectorAll(
        ".login-form input"
    ).forEach(input => {

        input.addEventListener("input", () => {

            input.classList.remove("input-error");

        });

    });


    /* =========================================================
       ACTIVE DESKTOP NAVIGATION
    ========================================================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document.querySelectorAll(
        ".desktop-navigation .nav-link"
    ).forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href) return;

        const linkPage =
            href.split("/").pop().toLowerCase();

        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {

            link.classList.add("active");

        }

    });


    /* =========================================================
       ACTIVE MOBILE NAVIGATION
    ========================================================= */

    document.querySelectorAll(
        ".drawer-navigation .drawer-link"
    ).forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href) return;

        const linkPage =
            href.split("/").pop().toLowerCase();

        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {

            link.classList.add("active");

        }

    });


    /* =========================================================
       DROPDOWN ACCESSIBILITY
    ========================================================= */

    const navDropdown =
        document.querySelector(".nav-dropdown");

    if (navDropdown) {

        const dropdownTrigger =
            navDropdown.querySelector(".nav-link");

        if (dropdownTrigger) {

            dropdownTrigger.addEventListener(
                "click",
                event => {

                    if (window.innerWidth <= 980) {
                        event.preventDefault();
                    }

                }
            );

        }

    }


    /* =========================================================
       PREVENT DOUBLE CLICK ISSUES
    ========================================================= */

    document.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            if (
                link.getAttribute("href") === "#" ||
                link.getAttribute("href") === ""
            ) {
                return;
            }

        });

    });


    /* =========================================================
       WINDOW RESIZE
    ========================================================= */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 980) {
            closeMobileDrawer();
        }

    });


    /* =========================================================
       INITIAL STATE
    ========================================================= */

    updateServiceCarousel();
    handleHeaderScroll();
    handleBackToTop();


    console.log(
        "NEXORA EXPRESS — Frontend initialized successfully."
    );

});