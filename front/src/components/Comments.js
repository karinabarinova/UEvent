import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import moment from 'moment';


const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function Comments(props) {
    const { t } = useTranslation('common')
    
    let comments = null;
    if (props?.comments?.length)
      comments = props.comments.map((comment, i) => {
        return (
          // <>
            <Grid container wrap="nowrap" spacing={2} key={`comment-id-${i}`}>
              <Grid item>
                <Avatar alt="Remy Sharp" src={imgLink} />
              </Grid>
              <Grid justifycontent="left" item xs zeroMinWidth>
                <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                <p style={{ textAlign: "left" }}>
					{comment.body}
                </p>
                <p style={{ textAlign: "left", color: "gray" }}>
                  posted {moment(comment.createdAt).fromNow()}
                </p>
              </Grid>
            </Grid>
            // <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
          // </>
        )
      })
    return (
      <div style={{ padding: 14 }}>
        <h1>{t('COMMENTS')}</h1>
        <Paper style={{ padding: "40px 20px" }}>
          {comments}
        </Paper>
      </div>
    );
  }