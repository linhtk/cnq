"use strict";
! function(a) {
    "function" == typeof define && define.amd ? define(["fastclick", "responsejs", "unveil", "placeholder", "waypoint", "waypoint.inview", "transit", "slimscroll"], a) : a()
}(function() {
    function a(a, d) {
        this.element = a, this.settings = $.extend({}, c, d), this._defaults = c, this._name = b, this.init()
    }
    var b = "Core",
        c = {
            console: !1,
            loader: !1,
            eventPrefix: "fa",
            breakpoint: {
                lg: 1200,
                md: 992,
                sm: 768,
                xs: 480
            }
        },
        d = !1,
        e = !1,
        f = !1,
        g = !1,
        h = !1;
    a.prototype = {
        init: function() {
            this.VIEWPORTWATCH(), this.MISC.Init(), this.PLUGINS()
        },
        VIEWPORTWATCH: function() {
            var a = this.element,
                b = this.settings;
            Response.action(function() {
                e = Response.band(b.breakpoint.lg), f = Response.band(b.breakpoint.md, b.breakpoint.lg - 1), g = Response.band(b.breakpoint.sm, b.breakpoint.md - 1), h = Response.band(0, b.breakpoint.xs), e && $(a).addClass("screen-lg").removeClass("screen-md").removeClass("screen-sm").removeClass("screen-xs"), f && $(a).removeClass("screen-lg").addClass("screen-md").removeClass("screen-sm").removeClass("screen-xs"), g && $(a).removeClass("screen-lg").removeClass("screen-md").addClass("screen-sm").removeClass("screen-xs"), h && $(a).removeClass("screen-lg").removeClass("screen-md").removeClass("screen-sm").addClass("screen-xs")
            })
        },
        MISC: {
            Init: function() {
                this.ConsoleFix(), this.Scrollbar(".slimscroll"), this.Fastclick(), this.Unveil(), this.BsTooltip(), this.BsPopover(), this.BsHoverDropdown(), this.InputPlaceholder()
            },
            ConsoleFix: function() {
                for (var a, b = function() {}, c = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], d = c.length, e = window.console = window.console || {}; d--;) a = c[d], e[a] || (e[a] = b)
            },
            Scrollbar: function(a) {
                $(".no-touch " + a).each(function(a, b) {
                    $(b).slimScroll({
                        size: "8px",
                        height: !1,
                        distance: "0px",
                        wrapperClass: $(b).data("wrapper") || "viewport",
                        railClass: "scrollrail",
                        barClass: "scrollbar",
                        wheelStep: 10,
                        railVisible: !1
                    })
                })
            },
            Fastclick: function() {
                FastClick.attach(document.body)
            },
            Unveil: function() {
                $("[data-toggle~=unveil]").unveil(200, function() {
                    $(this).load(function() {
                        $(this).addClass("unveiled")
                    })
                })
            },
            BsTooltip: function() {
                $("[data-toggle~=tooltip]").tooltip()
            },
            BsPopover: function() {
                $("[data-toggle~=popover]").popover()
            },
            BsHoverDropdown: function() {
                $('[data-toggle="dropdown"].dropdown-hover').dropdownHover().dropdown()
            },
            InputPlaceholder: function() {
                $("input, textarea").placeholder()
            }
        },
        PLUGINS: function() {
            var a = this.element,
                b = this.settings;
            ! function() {
                var b = "[data-toggle~=totop]";
                $(a).on("click", b, function(a) {
                    $("html, body").animate({
                        scrollTop: 0
                    }, 200), a.preventDefault()
                })
            }(),
            function() {
                var a = "[data-toggle~=waypoints]";
                $(a).each(function() {
                    {
                        var a = $(this).data("showanim") || "fadeIn",
                            b = $(this).data("hideanim") || !1,
                            c = $(this).data("offset") || "80%",
                            d = $(this).data("marker") || this;
                        $(this).data("trigger-once") || !1
                    }
                    $(d).waypoint({
                        handler: function(c) {
                            "down" === c && $(d).removeClass(b + " animated").addClass(a + " animating").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                                $(this).removeClass("animating").addClass("animated").removeClass(a)
                            }), "up" === c && b !== !1 && $(d).removeClass(a + " animated").addClass(b + " animating").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                                $(this).removeClass("animating").removeClass("animated").removeClass(b)
                            })
                        },
                        continuous: !0,
                        offset: c
                    })
                })
            }(),
            function() {
                var a = "[data-toggle~=inview]";
                $(a).each(function() {
                    var a = $(this).data("enter-class") || "inview-enter",
                        b = $(this).data("entered-class") || "inview-entered",
                        c = $(this).data("exit-class") || "inview-exit",
                        d = $(this).data("exited-class") || "inview-exited";
                    new Waypoint.Inview({
                        element: this,
                        enter: function() {
                            $(this.element).removeClass(b).removeClass(c).removeClass(d).addClass(a)
                        },
                        entered: function() {
                            $(this.element).removeClass(a).removeClass(c).removeClass(d).addClass(b)
                        },
                        exit: function() {
                            $(this.element).removeClass(a).removeClass(b).removeClass(d).addClass(c)
                        },
                        exited: function() {
                            $(this.element).removeClass(a).removeClass(b).removeClass(c).addClass(d)
                        }
                    })
                })
            }(),
            function() {
                var c, d = "[data-toggle~=selectrow]",
                    e = $(d).data("target"),
                    f = function(d, f) {
                        c = $(d).data("contextual") ? $(d).data("contextual") : "active", "checked" === f ? ($(d).parents(e).addClass(c), $(a).trigger(b.eventPrefix + ".selectrow.selected", {
                            element: $(d).parents(e)
                        })) : ($(d).parents(e).removeClass(c), $(a).trigger(b.eventPrefix + ".selectrow.unselected", {
                            element: $(d).parents(e)
                        }))
                    };
                $(d).each(function() {
                    $(this).is(":checked") && f(this, "checked")
                }), $(document).on("change", d, function() {
                    $(this).is(":checked") ? f(this, "checked") : f(this, "unchecked")
                })
            }(),
            function() {
                var c = "[data-toggle~=checkall]";
                $(c).each(function() {
                    $(this).is(":checked") && d()
                }), $(document).on("change", c, function() {
                    var a = $(this).data("target");
                    $(this).is(":checked") ? d(a) : e(a)
                });
                var d = function(c) {
                        $(c).find("input[type=checkbox]").each(function() {
                            "selectrow" === $(this).data("toggle") && ($(this).is(":checked") || $(this).prop("checked", !0).trigger("change"))
                        }), $(a).trigger(b.eventPrefix + ".checkall.checked", {
                            element: $(c)
                        })
                    },
                    e = function(c) {
                        $(c).find("input[type=checkbox]").each(function() {
                            "selectrow" === $(this).data("toggle") && $(this).is(":checked") && $(this).prop("checked", !1).trigger("change")
                        }), $(a).trigger(b.eventPrefix + ".checkall.unchecked", {
                            element: $(c)
                        })
                    }
            }(),
            function() {
                var c = !1,
                    d = "indicator",
                    e = "[data-toggle~=panelrefresh]";
                $(a).on("click", e, function(e) {
                    var f = $(this).parents(".panel"),
                        g = f.find("." + d);
                    c = $(this).hasClass("demo") ? !0 : !1, 0 !== g.length ? (g.addClass("show"), c && setTimeout(function() {
                        g.removeClass("show")
                    }, 2e3), $(a).trigger(b.eventPrefix + ".panelrefresh.refresh", {
                        element: $(f)
                    })) : $.error("There is no `indicator` element inside this panel."), e.preventDefault()
                })
            }(),
            function() {
                var c = "[data-toggle~=panelcollapse]";
                $(a).on("click", c, function(c) {
                    var d = $(this).parents(".panel"),
                        e = d.children(".panel-collapse"),
                        f = e.height();
                    0 === e.length && $.error('collapsable element need to be wrap inside ".panel-collapse"');
                    var g = function(c) {
                            $(c).removeClass("down").addClass("up"), $(e).removeClass("pull").addClass("pulling").css("height", "0px").transition({
                                height: f
                            }, function() {
                                $(this).removeClass("pulling").addClass("pull out"), $(this).css({
                                    height: ""
                                })
                            }), $(a).trigger(b.eventPrefix + ".panelcollapse.open", {
                                element: $(d)
                            })
                        },
                        h = function(c) {
                            $(c).removeClass("up").addClass("down"), $(e).removeClass("pull out").addClass("pulling").css("height", f).transition({
                                height: "0px"
                            }, function() {
                                $(this).removeClass("pulling").addClass("pull"), $(this).css({
                                    height: ""
                                })
                            }), $(a).trigger(b.eventPrefix + ".panelcollapse.close", {
                                element: $(d)
                            })
                        };
                    $(e).hasClass("out") ? h(this) : g(this), c.preventDefault()
                })
            }(),
            function() {
                var c, d, e = "[data-toggle~=panelremove]";
                $(a).on("click", e, function(e) {
                    c = $(this).parents(".panel"), d = $(this).data("parent"), c.transition({
                        scale: 0
                    }, function() {
                        d ? $(this).parents(d).remove() : $(this).remove(), $(a).trigger(b.eventPrefix + ".panelcollapse.remove", {
                            element: $(c)
                        })
                    }), e.preventDefault()
                })
            }(),
            function() {
                var c = "[data-toggle~=minimize]",
                    e = function(c) {
                        $(a).hasClass("sidebar-minimized") ? (d = !1, $(a).removeClass("sidebar-minimized"), $(a).trigger(b.eventPrefix + ".sidebar.maximize", {
                            element: $(a)
                        })) : (d = !0, $(a).addClass("sidebar-minimized"), $(a).trigger(b.eventPrefix + ".sidebar.minimize", {
                            element: $(a)
                        })), c.preventDefault()
                    };
                $(a).on("click", c, e)
            }(),
            function() {
                var b = "[data-toggle~=menu]",
                    c = "[data-toggle~=submenu]",
                    e = function(b) {
                        var c = $(this),
                            e = c.data("parent"),
                            f = c.data("target");
                        "click" === b.type && ($(f).hasClass("in") ? ($(f).collapse("hide"), c.parent().removeClass("open")) : (e && $(e + " .in").each(function() {
                            $(this).collapse("hide"), $(this).parent().removeClass("open")
                        }), $(f).collapse("show"), c.parent().addClass("open"))), (g || d) && $(f).length > 0 && $(a).hasClass("touch") && "click" === b.type && (c.parent().hasClass("hover") ? (c.parent().removeClass("hover"), $(f).css("top", "")) : (e && $(e + " .hover").each(function(a, b) {
                            $(b).removeClass("hover")
                        }), c.parent().addClass("hover"), $(f)[0].getBoundingClientRect().bottom >= Response.deviceH() && $(f).css("top", "-" + ($(f)[0].getBoundingClientRect().bottom - Response.deviceH() + 2) + "px")))
                    },
                    f = function(b) {
                        var e = $(this),
                            f = (e.children(c).data("parent"), e.children(c).data("target"));
                        (g || d) && $(f).length > 0 && ($(a).hasClass("touch") || ("mouseenter" === b.type && (e.addClass("hover open"), $(f)[0].getBoundingClientRect().bottom >= Response.deviceH() && $(f).css("top", "-" + ($(f)[0].getBoundingClientRect().bottom - Response.deviceH() + 2) + "px")), "mouseleave" === b.type && (e.removeClass("hover open"), $(f).css("top", ""))))
                    };
                $(document).on("click", c, e).on("mouseenter mouseleave", b + " > li", f)
            }(),
            function() {
                var c, d, e = "[data-toggle~=sidebar]",
                    f = "sidebar-open",
                    g = function() {
                        $(a).addClass(f + "-" + c), $(a).trigger(b.eventPrefix + ".sidebar.open", {
                            element: $(d)
                        })
                    },
                    h = function() {
                        $(a).hasClass(f + "-" + c) && ($(a).removeClass(f + "-" + c), $(a).trigger(b.eventPrefix + ".sidebar.close", {
                            element: $(d)
                        }))
                    },
                    i = function() {
                        return c = $(this).data("direction"), d = "ltr" === c ? ".sidebar-left" : ".sidebar-right", (c === !1 || "" === c) && $.error("missing `data-direction` value (ltr or rtl)"), $(a).hasClass(f + "-" + c) ? h() : g(), !1
                    };
                $(document).on("click", h).on("click", ".sidebar," + e, function(a) {
                    a.stopPropagation()
                }).on("click", e, i)
            }(), $(function() {
                var c, d, e, f = "[data-toggle~=offcanvas]",
                    g = [];
                $(f).each(function(f, h) {
                    var i = $(h).data("options");
                    void 0 !== i && "object" != typeof i ? g.push("OffCanvas: `data-options` need to be a valid javascript object!") : (d = "offcanvas-opener", e = "offcanvas-closer"), g.length <= 0 ? $(h).on("click", "." + d, function(d) {
                        c = $(this).hasClass("offcanvas-open-rtl") ? "offcanvas-open-rtl" : "offcanvas-open-ltr", $(h).removeClass("offcanvas-open-ltr offcanvas-open-rtl").addClass(c), $(a).trigger(b.eventPrefix + ".offcanvas.open", {
                            element: $(h)
                        }), d.preventDefault()
                    }).on("click", "." + e, function(c) {
                        $(h).removeClass("offcanvas-open-ltr offcanvas-open-rtl"), $(a).trigger(b.eventPrefix + ".offcanvas.close", {
                            element: $(h)
                        }), c.preventDefault()
                    }) : $.each(g, function(a, b) {
                        $.error(b)
                    })
                })
            })
        }
    }, $.fn[b] = function(c) {
        return this.each(function() {
            $.data(this, b) || $.data(this, b, new a(this, c))
        })
    }
});