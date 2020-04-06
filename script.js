let replacement = []
let liNum = 0;

function make_replacement(a, b, fl) {
    return {
        a,
        b,
        fl
    };
}

function make_replace(str) {
    let f = false;
    let i = 0;
    let res_string = ""
    while (!f && i < max_iter) {
        i++;
        let ind = -1;
        for (let j = 0; j < replacement.length; j++) {
            let r = replacement[j];
            ind = str.indexOf(r.a);
            if (ind != -1) {
                res_string += str + " &Rightarrow; ";
                if (r.a == "")
                    str = r.b + str;
                else
                    str = str.replace(r.a, () => r.b);

                f = r.fl;
                break;
            }
            f = f || ind == -1;
        }
    }
    res_string += str;
    return res_string;
}

function clear_rep() {
    replacement = []
    liNum = 0
    $("#list-rep").empty();
}

function add_replacement(p, q, flag) {
    replacement.push(make_replacement(p, q, flag));
    let end_string = "";
    if (flag)
        end_string = ".";
    let liId = 'li-' + liNum++;
    $("#list-rep").append('<li id="' + liId + '">' + p + "&rightarrow; " + end_string + q + " " + "</li>");
    return liId;
}
$('[data-toggle="tooltip"]').tooltip();
$('#navModal').popover({
    html: true,
    placement: 'bottom',
    title: 'Навигация',
    content: function() {
        return "<ul><li><a href='#definitions'>Определения</a></li><a href='#examples'>Примеры</a></li></ul>";
    }
});
$("#settings").on("click", function() { $("#settingsModal").modal(); });
$("#information").on("click", function() { $("#infoModal").modal(); });


$('#btn-append').on("click", function() {
    let p = $('#P').val().trim();
    $('#P').val(" ");
    let q = $('#Q').val().trim();
    $('#Q').val(" ");
    let end = $('#flag').prop('checked');
    let liId = add_replacement(p, q, end);
    $('#' + liId).hover(function() {
        $('<span>', {
                html: `<svg class="bi bi-pencil-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                 <path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z"/>
                 <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clip-rule="evenodd"/>
                 </svg>`,
                css: {
                    margin: '2px'
                },
                attr: {
                    'data-toggle': 'tooltip'
                },
                title: 'Изменить',
                on: {
                    click: function() {
                        if ($(this).parent().has('div').length == 0) {
                            $('<div/>', {
                                html: `<div class="col-5">
                        <input type='text' id='P-append' class="form-control" title="Подтрока поиска" data-toggle="tooltip"> 
                        </div>
                    <div>
                        &rightarrow;
                    </div>
                    <input type="checkbox" id="flag-append" title="Флаг конечной подстановки" data-toggle="tooltip">
                    <div class="col-5">
                        <input type="text" id="Q-append" class="form-control" title="Подтрока замены" data-toggle="tooltip">
                    </div>
                    
                    <div id="btn-save">
                        <svg class="bi bi-check-box" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                            <path fill-rule="evenodd" d="M1.5 13A1.5 1.5 0 003 14.5h10a1.5 1.5 0 001.5-1.5V8a.5.5 0 00-1 0v5a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5h8a.5.5 0 000-1H3A1.5 1.5 0 001.5 3v10z" clip-rule="evenodd"/>
                        </svg>          
                    </div>
                    `,
                                class: 'row'
                            }).appendTo($(this).parent())
                            $('[data-toggle="tooltip"]').tooltip();
                            $("#btn-save").on('click', function() {
                                let p_app = $('#P-append').val(),
                                    q_app = $('#Q-append').val(),
                                    flag_app = $('#flag-append').prop('checked');
                                let end_string = "";
                                if (flag_app)
                                    end_string = ".";
                                replacement[$('li').index($('#' + liId))] = make_replacement(p_app, q_app, flag_app);
                                $('#' + liId).html(p_app + "&rightarrow; " + end_string + q_app);
                            })
                        }
                    }
                }
            })
            .appendTo(this);
        $('<span>', {
                html: `<svg class="bi bi-x-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>
              </svg>`,
                css: {
                    margin: '2px'
                },
                attr: {
                    'data-toggle': 'tooltip'
                },
                title: "Удалить",
                on: {
                    click: function(event) {
                        replacement.splice($('li').index($('#' + liId)), 1);
                        $('#' + liId).remove();

                    }
                }
            })
            .appendTo(this);
        $('[data-toggle="tooltip"]').tooltip();
    }, function() {
        $('li span').remove();
    })
});

let max_iter = 2000;
$("#maxIter").on('input', function() {
    $("#showIters").html($(this).val());
    max_iter = $(this).val();
});




$("#btn-act").on("click", function() {
    $('#answer').html(make_replace($('#string').val().trim()));
    $('#string').val(" ");
})
$("#btn-removeAll").on('click', clear_rep)
$("#try-it1").on('click', function() {
    clear_rep();
    add_replacement('*11', '1*', false);
    add_replacement('*1', '#1', true);
    add_replacement('*', '#', true);
    add_replacement('', '*', false);
})
$("#try-it2").on('click', function() {
    clear_rep();
    add_replacement('*a', 'aa*', false);
    add_replacement('*b', 'bb*', false);
    add_replacement('*', '', true);
    add_replacement('', '*', false);
})
$("#try-it3").on('click', function() {
    clear_rep();
    add_replacement('cb', 'bc', false);
    add_replacement('ca', 'ac', false);
    add_replacement('ba', 'ab', false);
})