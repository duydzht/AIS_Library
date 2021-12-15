import React from 'react';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

const StudentItem = (props) => {
    return (
        <tr>
            <td>{props.student.name}</td>
            <td>{dateFormat(props.student.dob, 'dd/mm/yyyy')}</td>
            <td>{props.student.gender}</td>
            <td>{props.student.rollNumber}</td>
            <td>
                <Link
                    className='btn__table'
                    to={`/student-list/${props.student.id}`}
                >
                    <i className='fa fa-info-circle' aria-hidden='true'></i>
                </Link>
            </td>
        </tr>
    );
};

const StudentList = (props) => {
    const renderStudent = props.students.map((student) => {
        return (
            <tbody key={props.students.id}>
                <StudentItem student={student} />
            </tbody>
        );
    });
    return (
        <div className='text-center student_list'>
            <Link to='/student-list/insert-student'>
                <button className='btn__insert-student'>
                    <i className='fa fa-user-plus' aria-hidden='true'></i>
                </button>
            </Link>
            {/* <Link to={`/student-list/${props.students.id}`}>
                <button className='btn__insert-student'>
                    <i className='fa fa-user-circle ' aria-hidden='true'></i>
                </button>
            </Link> */}
            <div className='col-10 offset-1'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Gender</th>
                            <th>Roll Number</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    {renderStudent}
                </table>
            </div>
        </div>
    );
};

export default StudentList;
