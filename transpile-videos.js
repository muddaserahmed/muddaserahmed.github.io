// const urlParams = new URLSearchParams(window.location.search);
// const section_param = urlParams.get('section'); // 'John'
// Above params are globally declared in script.js

function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

function displayVideoSections(groupedData, sectionName) {
  const mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = ``;

  if(section_param){
    sectionName = section_param;
  }
  
  const heading = document.createElement('h2');
  heading.textContent = groupedData[0].Section;
  mainContent.appendChild(heading);

  for (const i in groupedData) {
    if(sectionName == groupedData[i].Section.replace(/\s/g, '-')){
      const sectionElement = document.createElement('section');
      sectionElement.id = groupedData[i].Section.replace(/\s/g, '-');
      // const heading = document.createElement('h2');
      // heading.textContent = groupedData[i].Section;
      // sectionElement.appendChild(heading);

      const item = groupedData[i];
      // items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        // Display the content for each item, e.g., itemElement.innerHTML = ...;
        var embed_link = item['Youtube - Main'] ? getId(item['Youtube - Main']) : '';
        itemElement.innerHTML = `<p>${item['Title']}</p>
        <section>` + 
          (item['Youtube - Original Video'] ? 
            `<a class="tooltip-class" href="${item['Youtube - Original Video']}">
              <i class="bi bi-person-video" style="font-size: 2rem; color: cornflowerblue;"></i>
              <span class="tooltiptext">Original Video Recording</span>
            </a>`
            : ''
          ) +
          (item['Parwez.tv - PDF'] ? 
            `<a class="tooltip-class" href="${item['Parwez.tv - PDF']}">
              <i class="bi bi-filetype-pdf" style="font-size: 2rem; color: cornflowerblue;"></i>
              <span class="tooltiptext">Download PDF</span>
            </a>`
            : ''
          ) +
          (item['Youtube - References Video'] ? 
            `<a class="tooltip-class" href="${item['Youtube - References Video']}">
              <i class="bi bi-signpost-split-fill" style="font-size: 2rem; color: cornflowerblue;"></i>
              <span class="tooltiptext">Quranic References Video</span>
            </a>`
            : ''
          ) +
          (item['Parwez.tv - HTML'] ? 
            `<a class="tooltip-class" href="${item['Parwez.tv - HTML']}">
              <i class="bi bi-browser-chrome" style="font-size: 2rem; color: cornflowerblue;"></i>
              <span class="tooltiptext">Read in Browser</span>
            </a>`
            : ''
          ) +
          (item['Parwez.tv - Main Alt'] ? 
            `<a class="tooltip-class" href="${item['Parwez.tv - Main Alt']}">
              <i class="bi bi-link" style="font-size: 2rem; color: cornflowerblue;"></i>
              <span class="tooltiptext">Alternate Link</span>
            </a>`
            : ''
          ) +
        `</section>

        <br>
        <iframe width="420" height="315"
        src="//www.youtube.com/embed/${embed_link}" frameborder="0" allowfullscreen>
        </iframe>`
        ;
        // Modify the content here based on your data structure and design

        sectionElement.appendChild(itemElement);
      // });
      
      mainContent.appendChild(sectionElement);
      
      // paginateData('special-lectures', groupedData);
    }
  }
}