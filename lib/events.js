/**
 * Bindings to Kanso events
 */

var events = require('duality/events'),
    session = require('session');


/**
 * The init method fires when the app is initially loaded from a page rendered
 * by CouchDB.
 */

/**
 * events.on('init', function () {
 *     // app initialization code goes here...
 * });
 */


/**
 * The sessionChange event fires when the app is first loaded and the user's
 * session information becomes available. It is also fired whenever a change
 * to the user's session is detected, for example after logging in or out.
 */

/**
 * events.on('sessionChange', function (userCtx, req) {
 *     // session change handling code goes here...
 * });
 */


/**
 * The updateFailure event fires when an update function returns a document as
 * the first part of an array, but the client-side request to update the
 * document fails.
 */

events.on('updateFailure', function (err, info, req, res, doc) {
    alert(err.message || err.toString());
});

// from https://gist.github.com/2586943
// topnav ala bootstrap

// stores a reference to the modal dialog
var m;

session.on('change', function (userCtx) {

    if (!$('#session_menu').length) {
        $('#topnav .pull-right').append(
            '<li id="session_menu" class="dropdown"><li>'
        );
    }
    var el;
    if (userCtx.name) {
        el = $(
            '<li id="session_menu" class="dropdown">' +
                '<a class="dropdown-toggle">' +
                    '<i class="icon-user"></i> ' + userCtx.name + ' ' +
                    '<b class="icon-chevron-down"></b>' +
                '</a>' +
                '<ul class="dropdown-menu">' +
                    '<li><a class="logout" href="#">Logout</a></li>' +
                '</ul>' +
            '</li>'
        );
        $('.dropdown-toggle', el).click(handleDropdown);
        $('.logout', el).click(function (ev) {
            ev.preventDefault();
            session.logout(function(err, resp) {
                location.href = dutils.getBaseURL();
            });
            return false;
        });
    }
    else {
        el = $(
            '<li id="session_menu">' +
                '<a class="login" href="#">Login</a>' +
            '</li>'
        );

        if (m) {
            // clear previous modal dialog
            m.modal('hide');
            m.data('modal', null);
            m.remove();
        }
        m = $(templates.render("login_modal.html", {userCtx: userCtx}, {}));

        var submitHandler = function(ev) {
            ev.preventDefault();

            var username = $('#id_username', m).val();
            var password = $('#id_password', m).val();

            $('.alert', m).remove();
            $('.help-inline', m).remove();
            $('.control-group', m).removeClass('error');
            $('.controls', m).show(); // sometimes these get hidden

            var username_cg = $('#id_username').parents('.control-group');
            var password_cg = $('#id_password').parents('.control-group');
            var errors = false;

            if (!username) {
                username_cg.addClass('error');
                $('#id_username').after(
                    '<span class="help-inline">Required</span>'
                );
                errors = true;
            }
            if (!password) {
                password_cg.addClass('error');
                $('#id_password').after(
                    '<span class="help-inline">Required</span>'
                );
                errors = true;
            }
            if (errors) {
                return false;
            }

            session.login(username, password, function (err) {
                if (err) {
                    var msg = err.toString();
                    $('form', m).before(
                        '<div class="alert alert-error">' + msg + '</div>'
                    );
                }
                else {
                    m.modal('hide');
                    location.href = dutils.getBaseURL();
                }
            });
            return false;
        };

        // this is broken for some reason, I suspect the bootstrap-modal
        // plugin is doing preventDefault on events inside the modal
        //$('form', m).submit(submitHandler);

        // fake form submit event
        $('input', m).keyup(function (ev) {
            if (ev.keyCode === 13) {
                return submitHandler.apply(this, arguments);
            }
        });

        $('.btn-primary', m).click(submitHandler);
        $('.btn-close', m).click(function () {
            m.modal('hide');
        });
        
        $('.login', el).click(function (ev) {
            ev.preventDefault();
            m.modal('show');
            $('#id_username').focus();
            return false;
        });
    }
    $('#session_menu').replaceWith(el);
});
