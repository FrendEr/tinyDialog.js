
/* =================================================
 *
 * @name    tinyDialog.js
 * @author  Frend
 * @github  https://github.com/FrendEr/tinyDialog.js
 *
 * =================================================
 */

;(function(root, factory) {
    if (typeof defien === 'function' && define.amd) {
        define(['jquery'], function($) {
            return factory();
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        window[root] = factory();
    }
}('tinyDialog', function() {
    'use strict';

    var VERSION = '1.0.0';
    var DEFAULTS = {
        content     : '提示',
        backdrop    : true,
        quickClose  : true,
        okValue     : '确定',
        cancelValue : '取消'
    };

    function tinyDialog(options) {
        options = $.extend({}, DEFAULTS, options);

        var self = this;
        var $tmp = $('<div/>');
        var randomId = new Date().getTime();
        var btnMap = [
            '<span class="td-cancel-btn">' + options.cancelValue + '</span><span class="td-ok-btn">' + options.okValue + '</span>',
            '<span class="td-ok-btn td-ok-btn-wide">' + options.okValue + '</span>'
        ];

        // dialog templates
        this.$backdrop = $('<div class="td-backdrop" data-id="' + randomId + '"></div>');
        this.$dialog = $('<div id="tinyDialog" class="td-dialog" data-id="' + randomId + '"' + (options.width ? (' style="width: ' + options.width + 'px;"') : '') + '></div>');
        var $tplTitle = $((options.title ? '<h2 class="td-title">' + options.title + '</h2>' : ''));
        var $tplContent = $('<div class="td-content">' + options.content + '</div>');
        var $tplBtns = $('<div class="td-btns">' + ((options.ok && options.cancel) ? btnMap[0] : btnMap[1]) + '</div>');

        // events binding
        if (options.quickClose) {
            this.$backdrop.on('click', function() {
                self.close();
            });
        }
        if (options.cancel && typeof options.cancel === 'function') {
            this.$dialog.on('click', '.td-cancel-btn', function(e) {
                e.stopPropagation();

                options.cancel.call(self);
            });
        }
        if (options.ok && typeof options.ok === 'function') {
            this.$dialog.on('click', '.td-ok-btn', function(e) {
                e.stopPropagation();

                options.ok.call(self);
            });
        }
        if (options.customEvent && typeof options.customEvent === 'function') {
            options.customEvent.call(self);
        }

        $tmp = $tmp.append($tplTitle).append($tplContent).append($tplBtns);
        this.$dialog.append($tmp);

        $(document.body).append(this.$backdrop).append(this.$dialog);
    }

    tinyDialog.prototype = {
        constructor: tinyDialog,

        close: function() {
            this.$dialog.remove();
            this.$backdrop.remove();
        }
    };

    return tinyDialog;
}));
