
var everythingHolder = document.querySelector('.middleContent')
var firstTime = true


var userList = {
   matt: {username: "Matt", showIds: [170,169,175,318,76,270, 255]},
   ed: {username: "Ed", showIds: [5853,431,80,279,570,76,73,20540,83,17119]},
   michelle: {username: "Michelle", showIds: [83,576,735,73,749,170,112,80]},
   justin: {username: "Justin", showIds: [551,169,490,530,73,302, 547, 532]},
}

var fillFirstContent = function(){

   var whoseWtch = document.createElement('p')
   whoseWtch.classList = 'whsWtc'
   whoseWtch.textContent = 'Who is watching MOVIE.flix?'
   everythingHolder.appendChild(whoseWtch)
   var userHolder = document.createElement('div')
   userHolder.classList = 'userHldr'
   everythingHolder.appendChild(userHolder)

   for (var key in userList){

      var userLink = document.createElement('a')
      userLink.href = '#' + key
      userHolder.appendChild(userLink)
      var userContainer = document.createElement('div')
      userContainer.classList = 'col-sm-3 userProf'
      userLink.appendChild(userContainer)
      var userPic = document.createElement('img')
      userPic.src = 'https://flathash.com/' + key
      userContainer.appendChild(userPic)
      var userNameHolder = document.createElement('div')
      userNameHolder.classList = 'caption'
      userContainer.appendChild(userNameHolder)
      var userName = document.createElement('h3')
      userName.textContent = key
      userName.classList = 'userNameTxt'
      userNameHolder.appendChild(userName)
   }
}


if (firstTime === true){
   fillFirstContent()
   firstTime = false
}







var hashChangeFunc = function(){
   var hashUser = window.location.hash
   var currntUser = hashUser.slice(1)

   if (window.location.hash.length === 0){
      everythingHolder.innerHTML = ''
      fillFirstContent()
      return

   }


      everythingHolder.innerHTML = ''

      console.log(userList[currntUser].showIds)



      var jumbotron = document.createElement('div')
         jumbotron.classList = 'container-fluid profJumbo'
         everythingHolder.appendChild(jumbotron)
         var jumboDesc = document.createElement('div')
            jumboDesc.classList = 'col-6 jumboDesc'
            jumbotron.appendChild(jumboDesc)
            var jdText = document.createElement('p')
               jdText.classList = 'jText'
               jumboDesc.appendChild(jdText)
         var jumboPic = document.createElement('div')
            jumboPic.classList = 'col-6 jumboPic'
            jumbotron.appendChild(jumboPic)
            var jpPic = document.createElement('img')
               jpPic.classList = 'jPic'

               jumboPic.appendChild(jpPic)
      var showHolder = document.createElement('div')
         showHolder.classList = 'container-fluid profShowsHolder'
         everythingHolder.appendChild(showHolder)
         for(var key in userList[currntUser].showIds){
            $.getJSON('http://api.tvmaze.com/shows/' + userList[currntUser].showIds[key], function(requestedData){
               jdText.innerHTML = requestedData.summary
               jpPic.src = requestedData.image.original
               var showPicHolder = document.createElement('div')
                  showPicHolder.classList = 'col-2 showPH'
                  showHolder.appendChild(showPicHolder)

                  var phImage = document.createElement('img')
                     phImage.addEventListener('click', changeJumbo)
                     phImage.src = requestedData.image.medium
                     phImage.alt = requestedData.id
                     showPicHolder.appendChild(phImage)



            })
         }

}



var changeJumbo = function(){
   $.getJSON('http://api.tvmaze.com/shows/' + this.alt, function(data){
      var desc = document.querySelector('.jText')
      var pic = document.querySelector('.jPic')

      pic.src = data.image.original
      desc.innerHTML = data.summary
   })

}






window.addEventListener('hashchange', hashChangeFunc)
