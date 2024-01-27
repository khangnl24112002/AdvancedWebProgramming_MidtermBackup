import React from "react";
import cn from "classnames";
import styles from "./UserCard.module.sass";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const UserCard = ({ email, firstName, lastName, image, status }) => {
    return (
        <Card className={styles.userCard}>
            <Card.Img
                style={{ height: "10rem", objectFit: "cover" }}
                variant="top"
                src={image}
            />
            <Card.Body className={styles.cardBody}>
                <Card.Title>{firstName + " " + lastName}</Card.Title>
                <Card.Text>{email}</Card.Text>
                <Card.Text>
                    Trạng thái hoạt động:{" "}
                    <span
                        style={
                            status === "Online"
                                ? { color: "green", fontWeight: 700 }
                                : { color: "red", fontWeight: 700 }
                        }
                    >
                        {status}
                    </span>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default UserCard;
