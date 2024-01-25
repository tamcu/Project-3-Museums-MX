# Project-3-Museums-MX


## Topic
Mexico’s Museum Directory


## Objective
This project aims to create an interactive and visually compelling Museum Directory for México. 

Utilizing a dataset available in [Sistema de Información Cultural](https://sic.cultura.gob.mx/), this directory will serve as a comprehensive resource for the nation's cultural diversity.


## Inspiration
Mexico is a country with a rich culture and history. Museums are the repositories of artifacts, artworks, and historical items that reflect the heritage and identity of a nation, which is why our keen interest in researching all of the museums in Mexico. 

Being able to identify the unique characteristics within the vast landscape of Mexican museums can provide valuable insights into the nation's cultural diversity.


## Visuals
- A map with the museums' geolocations 
- One bar chart displaying the number of museums per topic
- One bubble chart with a drop-down menu displaying the quantity of museums 


## Project components - Usage instructions 
### Selection via drop-down menu 
- Select a specific state via a drop-down menu to update the map 
- Marker for each museum’s geolocation in selected state will show 

### Interactive map
- Click on a marker to access detailed information about each museum 
- Zoom in, zoom out, pan, etc

### Bar chart
- Bar chart illustrating the distribution of museums per topic, per state in Mexico will update when selection changes 
- Comparison of the museum count per topic and concentration of cultural institutions

### Bubble chart 
- The bubble chart was created using [Apexcharts](https://apexcharts.com/) - this library was not reviewed in class 
- Bubble chart shows quantity of museums per state 
- Size of each bubble is related to quantity 

## Ethical considerations
The dataset employed was found in open data ("Datos abiertos") from Mexico government; it was reviewed the T&C and compliance was ensured. 

In the dataset, it was identified no bias related to people. 

About Personal Data Protection, the dataset contains personal information of museum employees (social media, e-mail, etc). Those data were cleaned and excluded to avoid being displayed with the information of each museum, as there is no explicit consent from the employees to use their information on the project. 

## Data sources 
https://sic.cultura.gob.mx/datos.php?table=museo 

https://www.google.com/maps 

https://www.geoapify.com/


### Github repository 
https://github.com/tamcu/Project-3-Museums-MX


### Credits 
* Received comments and guidance from Instructor, Teaching Assistant 
* Used StackOverflow, MDN, Apexcharts, module documentation for specific details 
