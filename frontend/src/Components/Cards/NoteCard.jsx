import React from "react";
import { MdCreate, MdDelete , MdOutlinePictureAsPdf,  MdTextFields} from "react-icons/md";
import "../../index.css";
import moment from 'moment';
const NoteCard = ({
  title,
  mood,
  date,
  content,
  tags,
  savedlocation,
  onEdit,
  onDelete,
  onExportPDF,
  onExportText
}) => {
  
  const formattedDate = moment(date).format('MMMM Do YYYY, h:mm a');


  return (
   <>
      <div className="border rounded bg-info-subtle p-3 mt-1 mb-2 ms-3 me-3 ">
        <div className="d-flex  justify-content-center">
          <p className="fs-3 mt-1 fst-italic">{title}</p>
          <p className="fs-2 ">{mood}</p>
          </div>
          <div>
          <p className="text-black mb-1">{content}</p>
          </div>
         
          <div className ="fs-5 text-success fw-medium mb-1 mt-3">{tags}</div>
         <div className="fs-6 fw-light text-primary mb-3">{savedlocation}</div>
         
         <div className="mb-2">
         
         </div>
        <div className="d-flex  mt-2 me-1 justify-content-between ">
        <div>{formattedDate}</div>
     <div  className="d-flex gap-2">
          <MdCreate style={{ cursor: "pointer" }} onClick={onEdit} size={20} />
          <MdDelete
            style={{ cursor: "pointer" }}
            onClick={onDelete}
            size={20}
          />
          <MdOutlinePictureAsPdf style={{ cursor: 'pointer' }} onClick={onExportPDF} size={20} />
          <MdTextFields style={{ cursor: 'pointer' }} onClick={onExportText} size={20} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
