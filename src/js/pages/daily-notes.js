// Add LocalStorage
(function (){

    let dailyPostsExistents = JSON.parse(localStorage.getItem('dailyPosts'));

    if(dailyPostsExistents != null){
        
        for(const singlePost in dailyPostsExistents){
            
            let postDate = dailyPostsExistents[singlePost].date;
            let postNote = dailyPostsExistents[singlePost].note;

            const latestPost = createDailyPost(postNote, postDate);

            document.getElementById('dailys').prepend(latestPost);

        }

    }

})();

// Favorite Post Daily
function favoriteDailyPost(){

    const posts = document.querySelectorAll('.single_daily');
    for(const post of posts){
        const favoriteButton = post.querySelector('#favoriteDaily');
        favoriteButton.addEventListener('click',()=>{
            favoriteButton.classList.toggle('enabled');
            if(favoriteButton.classList.contains('enabled')){
                favoriteButton.querySelector('img').setAttribute('src','src/img/star-solid.svg')
            }else{
                favoriteButton.querySelector('img').setAttribute('src','src/img/star-regular.svg')
            }
        })
    }

}
favoriteDailyPost();

// Remove Post Daily
function removeDailyPost(){

    const posts = document.querySelectorAll('.single_daily');
    for(const post of posts){
        const removeButton = post.querySelector('#removeDaily');
        removeButton.addEventListener('click',()=>{
            post.remove();
        })
    }

}
removeDailyPost();

// Create New Post Daily
function createButtons(){

    const buttons = document.createElement('div')
    const favoriteDiv = document.createElement('div')
    const favoriteImg = document.createElement('img')
    const removeDiv = document.createElement('div')
    const removeImg = document.createElement('img')

    buttons.classList.add('buttons')
    favoriteDiv.setAttribute('id','favoriteDaily')
    favoriteImg.setAttribute('src','src/img/star-regular.svg')
    removeDiv.setAttribute('id','removeDaily')
    removeImg.setAttribute('src','src/img/times-solid.svg')

    favoriteDiv.appendChild(favoriteImg)
    removeDiv.appendChild(removeImg)
    buttons.appendChild(favoriteDiv)
    buttons.appendChild(removeDiv)

    return buttons;

}

function createDailyPost(note, date){

    const div = document.createElement('div')
    const buttons = createButtons();
    const dateContent = document.createElement('div')
    const dateParagraph = document.createElement('p')
    const noteContent = document.createElement('div')
    const noteParagraph = document.createElement('p')

    div.classList.add('single_daily')
    dateContent.classList.add('date')
    noteContent.classList.add('note')
    dateParagraph.innerHTML = date;
    noteParagraph.innerHTML = note;
    
    div.appendChild(buttons)
    dateContent.appendChild(dateParagraph)
    noteContent.appendChild(noteParagraph)
    div.appendChild(dateContent)
    div.appendChild(noteContent)

    return div;

}

document.getElementById('formNote').addEventListener('submit',e => {
    e.preventDefault();

    let dailyNote = document.getElementById('note').value;
    
    let date = new Date();
    const months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    let dailyDate = `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`

    // Create Element
    const dailyPost = createDailyPost(dailyNote, dailyDate);

    

    document.getElementById('dailys').prepend(dailyPost);

    favoriteDailyPost();
    removeDailyPost();

    // Update LocalStorage
    if(localStorage.getItem('dailyPosts') == null){
        let objDailyAtual = {
            [date.getTime()]:{
                date: dailyDate,
                note: dailyNote
            }
        }

        localStorage.setItem('dailyPosts', JSON.stringify(objDailyAtual))
    }else{
        let atualLocalStorage = JSON.parse(localStorage.getItem('dailyPosts'));
        
        atualLocalStorage[date.getTime()] = {
            date: dailyDate,
            note: dailyNote
        }

        localStorage.setItem('dailyPosts', JSON.stringify(atualLocalStorage))
    }

}) 