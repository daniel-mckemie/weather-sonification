# Weather Sonification App

A data sonifier built in React, that reads the weather based on City/Country or Zip Code within the United States.  Returns real-time weather information from the Open Weather Map and sonifies it using the Web Audio API/R-Audio library.

Specific data points are assigned to a functioning bank of oscillators and filters. For example, temperature reads the frequency of one tone, while % of cloud cover is connected to another; wind speed is related to filter resonance, and so on. There are also assignments for latitude and longitude, which can change quite drastically when crossing hemispheres.

The goal of this project is to lay the groundwork to build out larger and more involved applications to sonify data.  Future work will include the soification of non-numerical data (clear sky, snow showers, etc.) and a system that updates in real-time.