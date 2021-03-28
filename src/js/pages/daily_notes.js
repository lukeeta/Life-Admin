const daily_notes = {
    on_page_load: {
        add_existents_posts: function(){
            let existents_posts = JSON.parse(localStorage.getItem('dailyPosts'))
            if (existents_posts != null){
                for (const single_post in dailyPostsExistents){
                    
                }
            }
        }
    },
    start: function(){
        daily_notes.on_page_load.add_existents_posts();
    }
}