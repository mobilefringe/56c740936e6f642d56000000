/*Created 2015-02-28 by CodeCloud Team*/



function renderBanner(banner_template,home_banner,banners){
    var item_list = [];
    var item_rendered = [];
    var banner_template_html = $(banner_template).html();
    Mustache.parse(banner_template_html);   // optional, speeds up future uses
    $.each( banners , function( key, val ) {
        today = new Date();
        start = new Date (val.start_date);
       
        start.setDate(start.getDate());
       if(val.url == "" || val.url === null){
           val.css = "style=cursor:default;";
           val.noLink = "return false";
       }
       if (start <= today){
         if (val.end_date){
             end = new Date (val.end_date);
             end.setDate(end.getDate() + 1);
             if (end >= today){
               item_list.push(val);  
             }
             
         } else {
             item_list.push(val);
         }
       }
    });

    $.each( item_list , function( key, val ) {
        var repo_rendered = Mustache.render(banner_template_html,val);
        item_rendered.push(repo_rendered);
       
    });
    $(home_banner).html(item_rendered.join(''));
    
}
function renderFeatureItems(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if(val.url == "" || val.url === null){
           val.css = "style=cursor:default;";
           val.noLink = "return false";
        }
        var repo_rendered = Mustache.render(template_html,val);
        item_rendered.push(repo_rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderPromotions(container, template, collection){
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
            val.store_name = site_json.mall_name;
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
        
        var show_date = new Date (val.show_on_web_date + site_json.time_zone);
        start = new Date (val.start_date + site_json.time_zone);
        end = new Date (val.end_date + site_json.time_zone);
    
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

function renderEvents(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    $.each( collection , function( key, val ) {
        if (val.eventable_type == "Store") {
            var store_details = getStoreDetailsByID(val.eventable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
            val.image_url = store_details.store_front_url_abs;
            val.cat_list = store_details.categories.join(',')
        }
        else{
            val.store_name = site_json.mall_name;
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
        
        if(val.event_image_url_abs.indexOf('missing.png') > -1){
            val.event_image_url_abs="http://assets.codecloudapp.com/sites/56c740936e6f642d56000000/image/png/1456246178000/promo_image.png";
        }
        
        var show_date = new Date (val.show_on_web_date + site_json.time_zone );
        start = new Date (val.start_date + site_json.time_zone);
        end = new Date (val.end_date + site_json.time_zone);
    
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
            val.alt_store_front_url = site_json.default_image;
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

function renderPromoDetails(container, template, collection){
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
            val.store_slug = store_details.slug
            if (store_details.website != null && store_details.website.length > 0){
                val.show = "display:block";
                val.website = store_details.website
            }
            else{
                val.show = "display:none";
            }
            if (store_details.phone != null && store_details.phone.length > 0){
                val.phone_show = "display:block";
                val.phone = store_details.phone
            }
            else{
                val.phone_show = "display:none";
                val.show = "display:none";
            }
        }
        else{
            val.store_name = site_json.mall_name;
            val.store_image = site_json.default_image;
            val.store_show = "display:none";
            val.phone_show = "display:none";
            val.show = "display:none";
            val.show_box= "display:none"
        }
        val.image_url = val.promo_image_url_abs
        
        if(val.image_url.indexOf('missing.png') > 0){
            val.image_url  = "http://assets.codecloudapp.com/sites/56c740936e6f642d56000000/image/png/1456246178000/promo_image.png";
        }
        
        if(val.promo_image_url_abs.indexOf('missing.png') > -1){
            val.promo_image_show="display:none";
        }
        
        var show_date = new Date (val.show_on_web_date + site_json.time_zone);
        start = new Date (val.start_date + site_json.time_zone);
        end = new Date (val.end_date + site_json.time_zone);
    
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

function renderEventDetails(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html); 
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if (val.eventable_type == "Store") {
            var store_details = getStoreDetailsByID(val.eventable_id);
            val.store_detail_btn = store_details.slug ;
            val.store_name = store_details.name;
            val.store_image = store_details.store_front_url_abs;
            val.store_slug = store_details.slug
            if (store_details.website != null && store_details.website.length > 0){
                val.show = "display:block";
                val.website = store_details.website
            }
            else{
                val.show = "display:none";
            }
            if (store_details.phone != null && store_details.phone.length > 0){
                val.phone_show = "display:block";
                val.phone = store_details.phone
            }
            else{
                val.phone_show = "display:none";
                val.show = "display:none";
            }
        }
        else{
            val.store_name = site_json.mall_name;
            val.store_image = site_json.default_image;
            val.store_show = "display:none";
            val.phone_show = "display:none";
            val.show = "display:none";
        }
        val.image_url = val.event_image_url_abs
        
        if(val.image_url.indexOf('missing.png') > 0){
            val.image_url  = "http://assets.codecloudapp.com/sites/56c740936e6f642d56000000/image/png/1456246178000/promo_image.png";
        }
        
        if(val.event_image_url_abs.indexOf('missing.png') > -1){
            val.promo_image_show="display:none";
        }
        
        var show_date = new Date (val.show_on_web_date + site_json.time_zone);
        start = new Date (val.start_date + site_json.time_zone);
        end = new Date (val.end_date + site_json.time_zone);
    
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

function renderJobs(container, template, collection){
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
            val.store_name = site_json.mall_name;
        }
        if(val.description.length > 200){
            val.description_short = val.description.substring(0,200) + "...";
        }
        else{
            val.description_short = val.description;
        }
        
        var show_date = new Date (val.start_date + site_json.time_zone);
        val.published_on = get_month(show_date.getMonth()) + " " + show_date.getDate();
        
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    $(container).html(item_rendered.join(''));
}

function renderStoreDetails(container, template, collection){
    var item_list = [];
    var item_rendered = [];
    var template_html = $(template).html();
    Mustache.parse(template_html);   // optional, speeds up future uses
    item_list.push(collection);
    $.each( item_list , function( key, val ) {
        if ((val.store_front_url).indexOf('missing.png') > -1){
            val.alt_store_front_url = "http://assets.codecloudapp.com/sites/56c740936e6f642d56000000/image/png/1455899596000/main_logo.png";
        } else {
            val.alt_store_front_url = getImageURL(val.store_front_url); 
        }
        
        if (val.website != null && val.website.length > 0){
            val.show = "display:inline-block";
        }
        else{
            val.show = "display:none";
        }
        if (val.phone != null && val.phone.length > 0){
            val.phone_show = "display:inline-block";
        }
        else{
            val.phone_show = "display:none";
        }
        
        if (val.twitter != null && val.twitter.length > 0){
            val.twitter_show = "display:inline-block";
        }
        else{
            val.twitter_show = "display:none";
        }
        
        if((val.twitter == null || val.twitter == "") && (val.facebook == "" || val.facebook == null)){
            val.hide_social = "display:none;";
        }
        if (val.facebook != null && val.facebook.length > 0){
            val.facebook_show = "display:inline-block";
        }
        else{
            val.facebook_show = "display:none";
        }
        val.map_x_coordinate = val.x_coordinate - 19;
        val.map_y_coordinate = val.y_coordinate - 58;
        var rendered = Mustache.render(template_html,val);
        item_rendered.push(rendered);
    });
    
    $(container).show();
    $(container).html(item_rendered.join(''));
}





