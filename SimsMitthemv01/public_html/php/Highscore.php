<?php

require('connect.php');

$sql = "SELECT * FROM highscore ORDER BY score DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

   // output data of each row
   while($row = $result->fetch_assoc()) {
       echo "
        <tr>
          <td>" . $row["name"] . "</td>
          <td>" . $row["date"] . "</td>
          <td>" . $row["score"] . "</td>
        </tr>
";
   }

} else {
   echo "0 results";
}

$conn->close();

?>
