import React from "react";
import { Button, ButtonGroup, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, useDisclosure } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { fetchWrapper } from "../utils/fetchWrapper";

interface DeletePopoverFormProps {
  queue_name: string
  item_name: string 
}

const deleteTheJob = (queue_name: string, item_name: string) => {
  fetchWrapper._delete(`http://localhost:7088/waiting_queue_items/${queue_name}/${item_name}`)
    .then(({ data }) => {
      console.log(data.success);
    })
    .catch((err) => { 
      console.log(err); 
  });
};

export const DeletePopoverForm: React.FC<DeletePopoverFormProps> = ({ queue_name, item_name }) => {
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
          size='s'
          p={1}
          variant="link"
          colorScheme="red"
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
                deleteTheJob(queue_name, item_name);
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
