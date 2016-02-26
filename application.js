/*Created 2015-02-28 by CodeCloud Team*/

function init(e){
    $('.open_menu').click(function(e){
        $('body').addClass('no_scroll');
        $('.mobile_menu_container').fadeIn();
    });
    $('#close_menu').click(function(e){
        $('body').removeClass('no_scroll');
        $('.mobile_menu_container').fadeOut();
    });
    
    $('#mobile_alpha_list').change(function(){
        window.location.href = "#" + $(this).val().toUpperCase();
    })
    
    $('#mobile_cat_list').change(function(){
        var v = $(this).val();
        if(v == "all"){
            $('.show_all_stores').click();
       }
       else{
           $('a[data-id="' + v + '"]').click();
       }
     
    })
    
    $('.locate_store').click(function(e){
        e.preventDefault();
        $('.stores_table').show()
    })
}

function renderPromotions(container, template, collection, mall_name){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if (val.promotionable_type == "Store") {
            var store_details = getStoreDetailsByID(val.promotionable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
            val.image_url = val.promo_image_url_abs;
            val.cat_list = store_details.categories.join(',')
        }
        else{
            val.store_name = mall_name;
            val.image_url = "http://assets.codecloudapp.com/sites/56c740936e6f642d56000000/image/png/1456246178000/promo_image.png";
        }
        
        if(val.image_url.indexOf('missing.png') > 0){
            val.image_url  = "http://assets.codecloudapp.com/sites/56c740936e6f642d56000000/image/png/1456246178000/promo_image.png";
        }
        
        if(val.description.length > 200){
            val.description_short = val.description.substring(0,200) + "...";
        }
        else{
            val.description_short = val.description
        }
        
        var show_date = new Date (val.show_on_web_date + "T05:00:00Z");
        start = new Date (val.start_date + "T05:00:00Z");
        end = new Date (val.end_date + "T05:00:00Z");
    
        if (start.toDateString() == end.toDateString()) {
            val.dates = (get_month(start.getMonth()))+" "+(start.getDate());    
        } else {
            val.dates = (get_month(start.getMonth()))+" "+(start.getDate())+" - "+get_month(end.getMonth())+" "+end.getDate();    
        }
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}


function renderGeneral(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        var repo_rendered = Mustache.render(template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderStoreList(container, template, collection, starter, breaker){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    var store_initial="";
    $.each( collection , function( key, val ) {
        
        if(!val.store_front_url ||  val.store_front_url.indexOf('missing.png') > -1 || val.store_front_url.length === 0){
            val.alt_store_front_url = "http://assets.codecloudapp.com/sites/56c740936e6f642d56000000/image/png/1455899596000/main_logo.png";
        } else {
            val.alt_store_front_url = getImageURL(val.store_front_url);    
        }
            
        //var categories = getStoreCategories();
        var current_initial = val.name[0];
        val.cat_list = val.categories.join(',')
        if(store_initial.toLowerCase() == current_initial.toLowerCase()){
            val.initial = "";
            val.show = "display:none;";
        }
        else{
            val.initial = current_initial;
            store_initial = current_initial;
            val.show = "display:block;";
        }
        if (val.promotions.length > 0){
            val.promotion_exist = "display:inline-block";
        }
        else{
            val.promotion_exist = "display:none";
        }
        if (val.jobs.length > 0){
            val.job_exist = "display:inline-block";
        }
        else{
            val.job_exist = "display:none";
        }
        val.block = current_initial + '-block';
        var rendered = Mustache.render(template_html,val);
        var upper_current_initial = current_initial.toUpperCase();
        item_rendered.push(rendered);
         

    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}

function renderPromoDetails(container, template, collection, mall_name){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        
        if (val.promotionable_type == "Store") {
            var store_details = getStoreDetailsByID(val.promotionable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
            val.store_image = store_details.store_front_url_abs;
        }
        else{
            val.store_name = mall_name;
            val.store_image = "http://assets.codecloudapp.com/sites/56c740936e6f642d56000000/image/png/1455899596000/main_logo.png";
        }
        console.log(val)
        val.image_url = val.promo_image_url_abs
        
        if(val.image_url.indexOf('missing.png') > 0){
            val.image_url  = "http://assets.codecloudapp.com/sites/56c740936e6f642d56000000/image/png/1456246178000/promo_image.png";
        }
        
        if(val.promo_image_url_abs.indexOf('missing.png') > -1){
            val.promo_image_show="display:none";
        }
        
        var show_date = new Date (val.show_on_web_date + "T05:00:00Z");
        start = new Date (val.start_date + "T05:00:00Z");
        end = new Date (val.end_date + "T05:00:00Z");
    
        if (start.toDateString() == end.toDateString()) {
            val.dates = (get_month(start.getMonth()))+" "+(start.getDate());    
        } else {
            val.dates = (get_month(start.getMonth()))+" "+(start.getDate())+" - "+get_month(end.getMonth())+" "+end.getDate();    
        }
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderJobs(container, template, collection, mall_name){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if(val.jobable_type == "Store"){
            val.store_name = getStoreDetailsByID(val.jobable_id).name;
            val.store_slug = getStoreDetailsByID(val.jobable_id).slug;
        }
        else{
            val.store_name = mall_name;
        }
        if(val.description.length > 200){
            val.description_short = val.description.substring(0,200) + "...";
        }
        else{
            val.description_short = val.description;
        }
        
        var show_date = new Date (val.start_date + "T05:00:00Z");
        val.published_on = get_month(show_date.getMonth()) + " " + show_date.getDate();
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}





