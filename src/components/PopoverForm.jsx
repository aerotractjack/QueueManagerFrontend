import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, Stack, ButtonGroup, Button, useDisclosure, Popover, PopoverTrigger, IconButton, PopoverContent, FocusLock, PopoverArrow, PopoverCloseButton, Select } from "@chakra-ui/react";
import { fetchWrapper } from "../utils/fetchWrapper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';


const moveJobToFrontOrBack = (frontOrBack, src, src_num, dst) => {
  let jsonData = { src, src_num, dst };
  if (frontOrBack === 'f') {
    fetchWrapper.post("http://localhost:7088/send_waiting_to_front", jsonData)
      .then( ({data}) => {
        console.log(data.success);
      })
      .catch((err) => { 
        console.log(err); 
    });
  } else {
    fetchWrapper.post("http://localhost:7088/send_waiting_to_back", jsonData)
      .then( ({data}) => {
        console.log(data.success);
      })
      .catch((err) => { 
        console.log(err); 
    });
  }
};

// The form inside the Popover
const Form = ({ onCancel, queues, currentQueue, currentJob }) => {
  const navigate = useNavigate();
  const [frontOrBack, setFrontOrBack] = useState("");
  const [selectedQueue, setSelectedQueue] = useState("");
  return (
    <Stack spacing={4}>
      <FormControl isRequired>
          <FormLabel>{"Move this item to the ..."}</FormLabel>
          <Select 
            placeholder='Select front or back'
            onChange={(e) => {
              setFrontOrBack(e.target.value);
            }}
          >
            <option value='f'>front</option>
            <option value='b'>back</option>
          </Select>
      </FormControl>

      <FormControl isRequired>
          <FormLabel>{"of the selected queue"}</FormLabel>
          <Select 
            placeholder='Select a queue'
            onChange={(e) => {
              setSelectedQueue(e.target.value);
            }}  
          >
            {queues.map((q, index) => (
              <option key={index}>{q}</option>
            ))}
          </Select>
      </FormControl>

      <ButtonGroup display='flex' justifyContent='flex-end'>
        <Button variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          colorScheme='teal'
          isDisabled={frontOrBack === "" || selectedQueue === ""}
          onClick={() => {
            moveJobToFrontOrBack(frontOrBack, currentQueue, currentJob, selectedQueue);
            navigate("/waiting");
            window.location.reload(true);
          }}
        >
          Move
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

// The Popover
const PopoverForm = ({ queues, currentQueue, currentJob }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = useRef(null);
  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement='right'
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <IconButton size='xs' isRound={true} icon={<FontAwesomeIcon icon={faEllipsisVertical}/>} />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form 
              onCancel={onClose} 
              queues={queues} 
              currentQueue={currentQueue}
              currentJob={currentJob}
            />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PopoverForm;
