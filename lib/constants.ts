export const FOOD_DATA_PROMPT = `Please provide the following data of the attached image in the requested data format below. ONLY PROVIDE THE REQUESTED DATA IN A JSON FORMAT, NOTHING ELSE.  PLEASE REMOVE ANY ADDITIONAL CONTEXT AFTER THE JSON FORMAT RESPONSE.
1. Type of food labeled as “Name”
2. Estimated number of calories labeled as “Calories”. Only provide the numerical value.
3. Estimated number of protein labeled as “Protein”. Only provide the numerical value.
4. Estimated number of fats labeled as “Fats”. Only provide the numerical value.
5. Estimated number of carbs labeled as “Carbs”. Only provide the numerical value.
6. Rate this type of food with a health score ranging from 1-5 with 5 being the healthiest and labeled as “Health Score”. Only provide the numerical value.
7. Estimated meal type labeled as “Type”. Only provide the type of meal, e.g. breakfast, lunch, dinner, or snack.
8. Provide a fun fact about the food in the image.
Return the data in the following format, DO NOT ADD ANY NEW LINE CHARACTERS OR ANY \, JUST RAW TEXT:
{"Name": "","Calories": "","Proteins": "","Fats": "","Carbs": "","Health Score": "", "Type": "", "Fact": ""}`;
