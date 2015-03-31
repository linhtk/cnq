"use strict";
! function(a) {
    "function" == typeof define && define.amd ? define(["selectize", "jquery-ui", "jquery-ui-timepicker-addon", "inputmask", "select2"], a) : a()
}(function() {
    $(function() {
        $("#selectize-customselect").selectize(), $("#selectize-tagging").selectize({
                delimiter: ",",
                persist: !1,
                create: function(a) {
                    return {
                        value: a,
                        text: a
                    }
                }
            }), $("#selectize-select").selectize({
                create: !0,
                sortField: {
                    field: "text",
                    direction: "asc"
                },
                dropdownParent: "body"
            }), $("#selectize-selectmultiple").selectize({
                maxItems: 3
            }),
            function() {
                var a = "([a-z0-9!#$%&*+/=?^_`{|}~-]+(?:[a-z0-9!#$%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)",
                    b = function(a) {
                        return $.trim((a.firstName || "") + " " + (a.lastName || ""))
                    };
                $("#selectize-contact").selectize({
                    persist: !1,
                    maxItems: null,
                    valueField: "email",
                    labelField: "name",
                    searchField: ["firstName", "lastName", "email"],
                    sortField: [{
                        field: "firstName",
                        direction: "asc"
                    }, {
                        field: "lastName",
                        direction: "asc"
                    }],
                    options: [{
                        email: "nikola@tesla.com",
                        firstName: "Nikola",
                        lastName: "Tesla"
                    }, {
                        email: "brian@thirdroute.com",
                        firstName: "Brian",
                        lastName: "Reavis"
                    }, {
                        email: "pampersdry@gmail.com",
                        firstName: "John",
                        lastName: "Pozy"
                    }],
                    render: {
                        item: function(a, c) {
                            var d = b(a);
                            return "<div>" + (d ? '<span class="name">' + c(d) + "</span>" : "") + (a.email ? '<small class="text-muted ml10">' + c(a.email) + "</small>" : "") + "</div>"
                        },
                        option: function(a, c) {
                            var d = b(a),
                                e = d || a.email,
                                f = d ? a.email : null;
                            return '<div><span class="text-primary">' + c(e) + "</span><br/>" + (f ? '<small class="text-muted">' + c(f) + "</small>" : "") + "</div>"
                        }
                    },
                    create: function(b) {
                        if (new RegExp("^" + a + "$", "i").test(b)) return {
                            email: b
                        };
                        var c = b.match(new RegExp("^([^<]*)<" + a + ">$", "i"));
                        if (c) {
                            var d = $.trim(c[1]),
                                e = d.indexOf(" "),
                                f = d.substring(0, e),
                                g = d.substring(e + 1);
                            return {
                                email: c[2],
                                firstName: f,
                                lastName: g
                            }
                        }
                        return !1
                    }
                })
            }(), $("#datepicker1").datepicker(), $("#datepicker2").datepicker({
                showOtherMonths: !0,
                selectOtherMonths: !0
            }), $("#datepicker3").datepicker({
                showButtonPanel: !0
            }), $("#datepicker4").datepicker({
                changeMonth: !0,
                changeYear: !0
            }), $("#datepicker-from").datepicker({
                defaultDate: "+1w",
                numberOfMonths: 2,
                onClose: function(a) {
                    $("#datepicker-to").datepicker("option", "minDate", a)
                }
            }), $("#datepicker-to").datepicker({
                defaultDate: "+1w",
                numberOfMonths: 2,
                onClose: function(a) {
                    $("#datepicker-from").datepicker("option", "maxDate", a)
                }
            }), $("#datetime-picker").datetimepicker(), $("#time-picker").timepicker(), $("#time-picker-format").timepicker({
                timeFormat: "hh:mm:ss tt"
            }), $("#time-picker-timezone").timepicker({
                timeFormat: "hh:mm:ss tt z"
            }), $('select[name="select2-basic"]').select2(), $('select[name="select2-multiple"]').select2(), $('select[name="select2-placeholder"]').select2({
                placeholder: "Select a State"
            })
    })
});