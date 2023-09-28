import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { fetchWrapper } from "../utils/fetchWrapper";
import { JobAnd3Logs } from "../components/JobAnd3Logs";

interface TmpdirLog {
  error: string 
  exception: string
  output: string 
}

export const CompletedJob = () => {
  const { state } = useLocation();
  const [tmpdirLog, setTmpdirLog] = useState<TmpdirLog>({} as TmpdirLog);
  const [tmpdirButtonSelected, setTmpdirButtonSelected] = useState<keyof TmpdirLog>("output");
  const [tmpdirLogSelected, setTmpdirLogSelected] = useState("");

  let src = "";
  if (typeof state.jobs[state.index]["input"] !== "undefined" && typeof state.jobs[state.index]["input"]["tmpdir"] !== "undefined") {
    src = state.jobs[state.index]["input"]["tmpdir"];
  }

  useEffect(() => {
    setTmpdirLog({} as TmpdirLog);
    fetchWrapper.get("http://localhost:7088/read_tmpdir?src="+src)
      .then(({data}) => {
        setTmpdirLog(data);
      })
      .catch((err) => { 
        console.log(err); 
      });
  }, [src]);

  useEffect(() => {
    if (Object.keys(tmpdirLog).length === 3) {
      if (tmpdirButtonSelected === "output") {
        setTmpdirLogSelected(tmpdirLog["output"]);
      } else if (tmpdirButtonSelected === "error") {
        setTmpdirLogSelected(tmpdirLog["error"]);
      } else if (tmpdirButtonSelected === "exception") {
        setTmpdirLogSelected(tmpdirLog["exception"]);
      }
    }
  }, [tmpdirButtonSelected, tmpdirLog]);

  return (
    <Layout>
      {Object.keys(tmpdirLog).length !== 3 ? (
        <Text>{"loading..."}</Text>
      ) : (
        <JobAnd3Logs
          page="c"
          jobs={state.jobs}
          jobNames={state.jobNames}
          index={state.index}
          tmpdirButtonSelected={tmpdirButtonSelected}
          setTmpdirButtonSelected={setTmpdirButtonSelected}
          tmpdirLogSelected={tmpdirLogSelected}
        />
      )}
    </Layout>
  );
};
