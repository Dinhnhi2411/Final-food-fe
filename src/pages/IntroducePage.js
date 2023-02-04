import { Box, Card, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

function IntroducePage() {
  return (
    <Container>
      <Card
      sx={{
        m:3
      }}
      >
        <Typography
          sx={{
            fontSize: 25,
            m: 3,
            fontWeight:600
          }}
        >
          Introduce
        </Typography>
        <Typography
          sx={{
            fontSize: 18,
            ml: 3,
            lineHeight:2
          }}
        >
          MINI FOOD là hệ thống cửa hàng phân phối thân thiện, chuyên cung cấp
          các sản phẩm Organic từ Đà Lạt Farm. Chúng tôi mang những sản phấm
          chất lượng vì sức khỏe đến tay người tiêu dùng.
        </Typography>
        <Box
        sx={{
            display:"flex",
            justifyContent:"center"
        }}
        >
        <Box
          component="img"
          sx={{
            width: 1000,
            height: "100%",
            ml: 1,
            mt: 1,
            borderRadius: 1,
            
          }}
          src="/images/introduce.png"
          alt="product"
        />
         </Box>

         <Typography
          sx={{
            fontSize: 18,
            m:3,
            lineHeight:2,
            textAlign:"Justify"
          }}
         >
        Cửa hàng Mini Food- Với mục tiêu trở thành một thương hiệu được khách hàng tin tưởng và coi như một địa chỉ mua sắm tin cậy đối với các loại trái cây, rau củ quả có chất lượng cao cho gia đình, cửa hàng Mini Food đang trở nên hoàn thiện hơn để đem đến cho khách hàng.
        <br/>
        Danh mục sản phẩm của cửa hàng Mini Food luôn đảm bảo cung cấp hầu hết những sản phẩm trái cây, rau của quả Organic đến với khách hàng theo mùa vụ của chính nước sở tại.

        Bên cạnh việc đảm bảo nguồn hàng có chất lượng phục vụ khách hàng, cửa hàng Mini Food cũng luôn chú trọng đến phương pháp và phong cách phục vụ để mọi khách hàng khi mua hàng tử cửa hàng Mini Food sẽ luôn thấy rằng mình là thường đế. Với một loạt các chính sách phục vụ khách hàng như: 
        <br/>
        <b>- Giao hàng miễn phí toàn bộ các quận nội thành TPHCM</b>
        <br/>
        <b>- Trợ giá đối với các đơn hàng vận chuyển đi các tỉnh</b>
        <br/>
        Chúng tôi tin tưởng rằng với những chiến lược và phương pháp phục vụ, chăm sóc khách hàng mà chúng tôi đang và sẽ thực hiện trong thời gian tới các khách hàng sẽ hoàn toàn hài lòng và gắn bó dài lâu với thương hiệu của cửa hàng Mini Food.


        </Typography>
        
          <Box
        sx={{
            display:"flex",
            justifyContent:"center",
        
        }}
        >
        <Box
          component="img"
          sx={{
            width: 1000,
            height: "100%",
            borderRadius: 1,
            
          }}
          src="/images/introduce_1.png"
          alt="product"
        />
         </Box>

          <Typography
          sx={{
            fontSize: 18,
            m:3,
            lineHeight:2,
            textAlign:"Justify"
          }}
         >
          Nhân Xuân 2023 cửa hàng Mini Food có chương trình khuyến mãi lên đến 50% áp dụng tại cửa hàng và đặt online.
          <br/>
          Cảm ơn quý khách hàng cùng đồng hành cùng Mini Food !

         </Typography>

          <Box
        sx={{
            display:"flex",
            justifyContent:"center"
        }}
        >
        <Box
          component="img"
          sx={{
            width: 1000,
            height: "100%",
            ml: 1,
            mt: 1,
            borderRadius: 1,
            
          }}
          src="/images/introduce_2.png"
          alt="product"
        />
         </Box>
          <Box
          sx={{
            display:"flex",
            justifyContent:"center"
          }}
          >
         <Typography
          sx={{
            fontSize: 18,
            m:3,
            lineHeight:2,
            
            textAlign:"Justify"
            
          }}
         >
         <b>Hệ thống chi nhành của Mini Food :</b>
         <br/>
         1. 190 Đại lộ Đồng Khởi, TP.Bến Tre
         <br/>
         2. 19 Lê Hoàng Phái, P.17, Q.Gò Vấp, TP.HCM
         <br/>
         3. 25 CMT8, Q10, TP.HCM
         <br/>

         </Typography>
          </Box>
      </Card>
    </Container>
  );
}

export default IntroducePage;
