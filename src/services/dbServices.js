import Localbase from "localbase";
import Sheet1Data, { version as version1 } from "../450DSAFinal"; // Sheet 1
import Sheet2Data, { version as version2 } from "../striverTrial"; // Sheet 2

let db = new Localbase("450dsaDB");
window.db = db;
db.config.debug = false;

const sheetMap = {
  sheet1: { data: Sheet1Data, version: version1 },
  sheet2: { data: Sheet2Data, version: version2 },
};

// Initialize DB for a sheet
export function getData(sheetKey, callback) {
  const localVersion = localStorage.getItem(sheetKey + "_version");
  const { data: QuestionData, version } = sheetMap[sheetKey];

  db.collection(sheetKey)
    .get()
    .then((data) => {
      if (!data || data.length === 0) {
        // Insert initial data
        QuestionData.forEach((topic) => {
          db.collection(sheetKey).add(
            topic,
            topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase()
          );
        });
        localStorage.setItem(sheetKey + "_version", version);
        callback(QuestionData);
      } else {
        // Version check
        if (parseInt(localVersion) !== version) {
          data.forEach((topic, i) => {
            const jsonTopic = QuestionData[i];
            topic.questions.forEach((q, idx) => {
              if (q.Done) jsonTopic.questions[idx].Done = true;
              jsonTopic.questions[idx].Bookmark = q.Bookmark || false;
              jsonTopic.questions[idx].Notes = q.Notes || "";
            });
            const key = topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase();
            db.collection(sheetKey).doc(key).update({
              started: topic.started,
              doneQuestions: topic.doneQuestions,
              questions: jsonTopic.questions,
            });
          });
          localStorage.setItem(sheetKey + "_version", version);
        }
        // Return data
        callback(data);
      }
    })
    .catch((err) => console.error("DB getData error:", err));
}

export function updateDBData(sheetKey, key, updateData) {
  db.collection(sheetKey).doc(key).update(updateData);
}

export function resetDBData(sheetKey, callback) {
  db.collection(sheetKey)
    .delete()
    .then(() => callback())
    .catch((err) => console.error("DB reset error:", err));
}

export function exportDBData(sheetKey, callback) {
  db.collection(sheetKey)
    .get()
    .then((data) => callback(data))
    .catch((err) => console.error("DB export error:", err));
}

export function importDBData(sheetKey, data, callback) {
  resetDBData(sheetKey, () => {
    Promise.all(
      data.map((topic) =>
        db.collection(sheetKey).add(
          topic,
          topic.topicName.replace(/[^A-Z0-9]+/gi, "_").toLowerCase()
        )
      )
    ).then(() => getData(sheetKey, callback));
  });
}
