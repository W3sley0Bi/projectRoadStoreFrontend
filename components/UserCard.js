
import * as React from "react";
import { Button, Grid, Card, Text, Row, Spacer, Link } from "@nextui-org/react";


export default function UserCard(prop){

return (
  
<div key={prop.id}>
<Link href={`/userFolder/${prop.id}`}>
  <Card isPressable>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src={`https://api.dicebear.com/5.x/adventurer-neutral/svg?seed=${prop.id}`}
        objectFit="cover"
        width="100%"
        height={140}
      />
    </Card.Body>
    <Card.Footer css={{ justifyItems: "flex-start" }}>
      <Row wrap="wrap" justify="space-between" align="center">
        <Text b>{prop.name} </Text>
        <Text
          css={{
            color: "$accents7",
            fontWeight: "$semibold",
            fontSize: "$sm",
          }}
        >
          ID:{prop.id}
        </Text>
      </Row>
    </Card.Footer>
  </Card>
  <Spacer y={2} />
</Link>
</div>
)


        }