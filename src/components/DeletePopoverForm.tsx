import React from "react";
import { Button, ButtonGroup, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, useDisclosure } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { fetchWrapper } from "../utils/fetchWrapper";
import { useNavigate } from "react-router-dom";

interface DeletePopoverFormProps {
  page: string
  queue_name?: string
  device_name?: string
  item_name?: string
  iconSize?: string
}

const deleteTheJob = (page: string, queue_name?: string, device_name?: string, item_name?: string) => {
  let url = "";
  if (page === "w") {
    url = `http://localhost:7088/waiting_queue_items/${queue_name}/${item_name}`;
  } else if (page === "i") {
    url = `http://localhost:7088/inprocess_queue_items/${device_name}`;
  } else if (page === "f") {
    url = `http://localhost:7088/failed_queue_items/${item_name}`;
  } else if (page === "c") {
    url = `http://localhost:7088/completed_queue_items/${item_name}`;
  }
  fetchWrapper._delete(url)
    .then(({ data }) => {
      console.log(data.success);
    })
    .catch((err) => { 
      console.log(err); 
  });
};

export const DeletePopoverForm: React.FC<DeletePopoverFormProps> = ({ page, queue_name, device_name, item_name, iconSize="xs" }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
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
          size={iconSize}
          p={iconSize==="xs" ? 1 : 3}
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
          <ButtonGroup>
            <Button variant='outline' onClick={onClose}>Cancel</Button>
            <Button 
              colorScheme='red'
              onClick={() => {
                deleteTheJob( page, queue_name, device_name, item_name );
                let url = "";
                if (page === "w") {
                  url = "/waiting";
                } else if (page === "i") {
                  url = "/inprocess";
                } else if (page === "f") {
                  url = "/failed";
                } else if (page === "c") {
                  url = "/completed";
                }
                navigate(url, {
                  state: {
                    reload: true,
                  }
                });
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
