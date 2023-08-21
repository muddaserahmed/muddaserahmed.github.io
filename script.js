const urlParams = new URLSearchParams(window.location.search);
const page_param = urlParams.get('page');
const section_param = urlParams.get('section');


document.addEventListener('DOMContentLoaded', function () {
  showLoader();
    loadData(page_param, section_param)
    .then(dataArray => {
      hideLoader();
      paginateData('special-lectures', dataArray);
    })
    .catch(error => {
      hideLoader();
      console.error('Error fetching Special Lectures:', error);
    });


  function fetchSheetData(sheetName) {
    return new Promise((resolve, reject) => {
      const spreadsheetId = '1jYLKu3YNXqQHaqQqdCllDp0evRBbqEyUmA8NPxoFw0c';
      const apiKey = 'AIzaSyBp0814Wytd7Lwi407_cEuV1TtSL6irB60';

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}?key=${apiKey}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.values && data.values.length > 1) {
            const headers = data.values[0];
            const result = data.values.slice(1).map(row => {
              const item = {};
              row.forEach((value, index) => {
                item[headers[index]] = value;
              });
              return item;
            });
            resolve(result);
          } else {
            resolve([]);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          reject(error);
        });
    });
  }

  async function loadData(sheetName, sectionName) {
    try {
      const data = await fetchSheetData(sheetName);
      const groupedData = FilterSectionData(data);
  
      // Display the data
      displayNavigationMenu(Object.keys(groupedData));
  
      // Extract the array of data from the groupedData object and return it
      const dataArray = Object.values(groupedData).flat();
      return dataArray;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function FilterSectionData(data) {
    const groupedData = {};

    data.forEach(item => {
      const section = item.Section;
      if (!groupedData[section]) {
        groupedData[section] = [];
      }
      if(item.Section.replace(/\s/g, '-') == section_param){
          groupedData[section].push(item);
      }
    });

    return groupedData;
  }



  function displayNavigationMenu(sections) {
    const navigationMenu = document.getElementById('navigationMenu');
    const selectedSection = urlParams.get('section'); // Get the selected section from the query parameters
    
    sections.forEach(section => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = section;
        const pageParam = urlParams.get('page');
        link.href = `?page=${pageParam}&section=${section.replace(/\s/g, '-')}`;

        // Check if the current section matches the selected section and add 'active' class if they match
        if (section.replace(/\s/g, '-') === selectedSection) {
            link.classList.add('active');
        }

        listItem.appendChild(link);
        navigationMenu.appendChild(listItem);
    });
  }

  

  function paginateData(sectionId, dataArray) {
    const resultsPerPage = 6;
    const totalResults = dataArray.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    const sectionElement = document.getElementById(sectionId);
    const contentElement = sectionElement.querySelector(`#${sectionId}-content`);
    const paginationElement = sectionElement.querySelector(`#${sectionId}-pagination`);

    function showPage(pageNumber) {
        const startIndex = (pageNumber - 1) * resultsPerPage;
        const endIndex = startIndex + resultsPerPage;
        const pageResults = dataArray.slice(startIndex, endIndex);
        const page_param = urlParams.get('page'); // Assuming urlParams is defined elsewhere

        if (page_param == 'quran-lectures' ||
            page_param == 'special-lectures' ||
            page_param == 'audiobooks-english' ||
            page_param == 'audiobooks-urdu') {
            displayVideoSections(pageResults, sectionId);
        } else if (page_param == 'books-urdu' ||
            page_param == 'books-english' ||
            page_param == 'pamphlets-english' ||
            page_param == 'pamphlets-urdu') {
            displayTextSections(pageResults, sectionId);
        }

        paginationElement.innerHTML = ''; // Clear existing pagination before creating new links
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.classList.add('btn', 'btn-outline-primary');
            pageLink.style.marginRight = "10px";
            pageLink.href = '#';
            pageLink.textContent = i;

            if (i === pageNumber) {
                pageLink.classList.add('highlighted'); // Add a class to highlight the current page link
            }

            pageLink.addEventListener('click', () => showPage(i));
            paginationElement.appendChild(pageLink);
        }
    }

    showPage(1);
  }




  // ...

  function showLoader() {
    const loaderElement = document.createElement('div');
    loaderElement.className = 'loader';
    document.getElementById('loader-div').appendChild(loaderElement);
  }

  function hideLoader() {
    const loaderElement = document.querySelector('.loader');
    if (loaderElement) {
      loaderElement.remove();
    }
  }
});
