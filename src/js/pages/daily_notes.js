function action_favorite_single_post(){
    const posts = document.querySelectorAll('.single_daily');
    for(const post of posts){
        const favorite_button = post.querySelector('#favoriteDaily');
        favorite_button.addEventListener('click',()=>{
            favorite_button.classList.toggle('enabled');
            if(favorite_button.classList.contains('enabled')){
                favorite_button.querySelector('img').setAttribute('src','src/img/star-solid.svg')
            }else{
                favorite_button.querySelector('img').setAttribute('src','src/img/star-regular.svg')
            }
        })
    }
}

function action_remove_single_post(){

    const posts = document.querySelectorAll('.single_daily');
    for(const post of posts){
        const remove_button = post.querySelector('#removeDaily');
        remove_button.addEventListener('click',()=>{
            let timestamp_post = post.getAttribute('timestamppost');
            post.remove();
            remove_local_storage(timestamp_post)
        })
    }

    function remove_local_storage(timestamp_post){
        if(timestamp_post !== null){
            let existents_posts = JSON.parse(localStorage.getItem('dailyPosts'));

            for(const single_post in existents_posts){
                if (single_post == timestamp_post){
                    delete existents_posts[timestamp_post]
                    break;
                }
            }

            localStorage.setItem('dailyPosts', JSON.stringify(existents_posts))

        }
    }

}

function create_buttons(){

    const buttons = document.createElement('div')
    const favorite_content = document.createElement('div')
    const favorite_img = document.createElement('img')
    const remove_content = document.createElement('div')
    const remove_img = document.createElement('img')

    buttons.classList.add('buttons')
    favorite_content.setAttribute('id','favoriteDaily')
    favorite_img.setAttribute('src','src/img/star-regular.svg')
    remove_content.setAttribute('id','removeDaily')
    remove_img.setAttribute('src','src/img/times-solid.svg')

    favorite_content.appendChild(favorite_img)
    remove_content.appendChild(remove_img)
    buttons.appendChild(favorite_content)
    buttons.appendChild(remove_content)

    return buttons;

}

function create_single_post_element(note,date,timestamp){

    const div = document.createElement('div')
    const buttons = create_buttons();
    const date_content = document.createElement('div')
    const date_paragraph = document.createElement('p')
    const note_content = document.createElement('div')
    const note_paragraph = document.createElement('p')

    div.classList.add('single_daily')
    div.setAttribute('timestampPost',`${timestamp}`)
    date_content.classList.add('date')
    note_content.classList.add('note')
    date_paragraph.innerHTML = date;
    note_paragraph.innerHTML = note;
    
    div.appendChild(buttons)
    date_content.appendChild(date_paragraph)
    note_content.appendChild(note_paragraph)
    div.appendChild(date_content)
    div.appendChild(note_content)

    return div;

}

const daily_notes = {
    on_page_load: {
        add_existents_posts: function(){
            let existents_posts = JSON.parse(localStorage.getItem('dailyPosts'))
            if (existents_posts != null){
                for (const single_post in existents_posts){
                    let single_post_date = existents_posts[single_post].date;
                    let single_post_note = existents_posts[single_post].note;
                    document.getElementById('dailys').prepend(create_single_post_element(single_post_note, single_post_date, single_post));
                }
            }
            action_favorite_single_post();
            action_remove_single_post();
        }
    },
    on_ready:function(){
        document.getElementById('formNote').addEventListener('submit',e => {
            e.preventDefault();

            let daily_note = document.getElementById('note').value;
            let date = new Date();
            const months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
            let daily_date = `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
            let timestamp = date.getTime();

            const daily_post = create_single_post_element(daily_note, daily_date, timestamp)

            document.getElementById('dailys').prepend(daily_post);

            action_favorite_single_post();
            action_remove_single_post();

            if(localStorage.getItem('dailyPosts') == null){
                let daily_post = {
                    [date.getTime()]:{
                        date: daily_date,
                        note: daily_note
                    }
                }

                localStorage.setItem('dailyPosts', JSON.stringify(daily_post))
            }else{
                let existent_local_storage = JSON.parse(localStorage.getItem('dailyPosts'));
                
                existent_local_storage[date.getTime()] = {
                    date: daily_date,
                    note: daily_note
                }

                localStorage.setItem('dailyPosts', JSON.stringify(existent_local_storage))
            }
        })
    },
    start_app: function(){
        daily_notes.on_page_load.add_existents_posts();
        daily_notes.on_ready();
    }
}

window.onload = function(){
    daily_notes.start_app();
}