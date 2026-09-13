import { useState } from "react";
import axios, { Axios } from "axios";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [wordData, setWordData] = useState(null);

  const searchWord = async () => {
    try {
      if (word.trim().length === 0) {
        setErrors("Please Enter a Word...");
        return;
      }
      setLoading(true);
      setErrors("");
      let res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );
      console.log(res);

      console.log(res);
      setWordData(res.data[0]);
    } catch (error) {
      console.log(error);
      setErrors("Word not found...");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-radial from-indigo-500 via-sky-400 to-cyan-300 p-8 flex justify-center items-center">
      <div className=" bg-white/50 w-full max-w-2xl rounded-3xl p-8 shadow-xl shadow-black/40">
        <h1 className="text-4xl text-center font-bold text-indigo-900 mb-8 text-shadow-sm text-shadow-black ">
          📔Dictionary App
        </h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter any word"
            className="border-2 border-indigo-500 px-4 py-3 rounded-xl outline-none focus:border-indigo-800 flex-1 font-semibold hover:placeholder:text-sm hover:placeholder:text-blue-700"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button
            className="bg-black/70 px-4 rounded-2xl text-white font-medium text-xl hover:text-yellow-400 hover:bg-black"
            onClick={searchWord}
          >
            Search🔍
          </button>
        </div>
    

        {loading && (
          <h2 className="text-center font-semibold mt-6 text-blue-600 animate-pulse text-xl">
            Searching...
          </h2>
        )}

          <h2
            className="text-center
         font-semibold text-lg text-red-600 animate-bounce mt-6"
          >
            {errors}
          </h2>
        

        {wordData && (
          <div className="bg-indigo-300 mt-6 rounded-2xl p-6 ">
            <h2 className="text-3xl font-bold text-indigo-800">
              {wordData.word}
            </h2>
            <p className="mt-2 text-gray-700 font-medium">
              {wordData.phonetic || "Phonetic not Found"}
            </p>

            <div className="mt-5 space-y-3">
              <div className="grid grid-cols-2 justify-between rounded-xl bg-white/60 p-4">
                <span className="font-semibold">Part of Speech: </span>
                <span>{wordData.meanings[0].partOfSpeech}</span>
                <span className="font-semibold">synonyms: </span>
                <span>{wordData.meanings[0].synonyms[0]}</span>
              </div>

              <div className="bg-white/60 p-4 rounded-xl">
                <h3 className="font-semibold mb-2">Meaning: </h3>
                <p>{wordData.meanings[0].definitions[0].definition}</p>
              </div>

              <div className="bg-white/60 rounded-xl p-4">
                <h3 className="font-medium mb-2">Example: </h3>
                <p>
                  {wordData.meanings[0].definitions[0].example ||
                    "No Example Available"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
