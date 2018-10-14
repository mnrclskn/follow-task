$(document).ready(function(){
    $('.delete-customer').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url: '/customers/'+id,
            success: function(response){
                alert('Deleting Customer');
                window.location.href='/';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});
