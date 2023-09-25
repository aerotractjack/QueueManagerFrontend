import React from "react";
import { Button, ButtonGroup, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, useDisclosure } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { fetchWrapper } from "../utils/fetchWrapper";

interface DeletePopoverFormProps {
  page: string
  queue_name?: string
  device_name?: string
  item_name?: string
}

const deleteTheJob = (page: string, queue_name?: string, device_name?: string, item_name?: string) => {
  let url = "";
  if (page === "w") {
    url = `http://localhost:7088/waiting_queue_items/${queue_name}/${item_name}`;
  } else if (page === "i") {
    url = `http://localhost:7088/inprocess_queue_items/${device_name}`;
  } else if (page === "f") {
    url = `http://localhost:7088/failed_queue_items/${item_name}`;
  }
  fetchWrapper._delete(url)
    .then(({ data }) => {
      console.log(data.success);
    })
    .catch((err) => { 
      console.log(err); 
  });
};

export const DeletePopoverForm: React.FC<DeletePopoverFormProps> = ({ page, queue_name, device_name, item_name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      returnFocusOnClose={true}
      placement='right'
      closeOnBlur={true}
    >
      <PopoverTrigger>
        <IconButton
          aria-label="Delete"
          icon={<DeleteIcon/>}
          size='xs'
          p={1}
          variant="link"
          colorScheme="red"
          isRound={true}
          style={{border: "solid"}}
        />
      </PopoverTrigger>
      
      <PopoverContent>
        <PopoverHeader fontWeight='semibold'>Warning</PopoverHeader>
        
        <PopoverArrow />
        
        <PopoverCloseButton />

        <PopoverBody>
          Are you sure you want to delete this job? (Deletion can't be reverted)
        </PopoverBody>

        <PopoverFooter display='flex' justifyContent='flex-end'>
          <ButtonGroup size='sm'>
            <Button variant='outline' onClick={onClose}>Cancel</Button>
            <Button 
              colorScheme='red'
              onClick={() => {
                deleteTheJob( page, queue_name, device_name, item_name );
                window.location.reload();
              }}
            >
              Delete
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
