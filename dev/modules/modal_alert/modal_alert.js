/**
 * modal alert
 */


function modal_alert(options, onClose) {
    var options_obj = {}
    if( typeof options == "string"){
        options_obj.content = options
        if(onClose != undefined && typeof onClose == 'function'){
            options_obj.onClose = onClose
        }        
    }
    if(typeof options == 'object'){
        options_obj = options
    }
    
    this.options = $.extend({
        title: '提示',
        content: '',
        onClose: null
    }, options_obj);
}

modal_alert.prototype.show = function () {
    var html = $('<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">' + this.options.title + '</h4></div><div class="modal-body"><p>' + this.options.content + '</p></div><div class="modal-footer"><button type="button" class="btn btn-primary">确定</button></div></div></div></div>');
    $("body").append(html);
    html.modal('show');

    html.on('click', '.btn-primary', function(){
        html.modal('hide');
    });

    html.on('hidden.bs.modal', function (e) {
        html.remove();
        if(this.options.onClose){
            this.options.onClose();
        }
    }.bind(this));
};

module.exports = function(options, onClose){
    var new_modal_alert = new modal_alert(options, onClose);
    new_modal_alert.show();
};