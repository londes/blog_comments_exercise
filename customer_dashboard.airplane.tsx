import {
  Stack,
  Table,
  Title,
  useComponentState,
  Card,
  Text,
  Button,
} from "@airplane/views";
import airplane from "airplane";

const CustomerDashboard = () => {
  const commentsState = useComponentState("comments");
  const selectedComments = commentsState.selectedRows;

  const reviewersState = useComponentState("reviewers");
  const selectedReviewer = reviewersState.selectedRow;
  const commentsForReviewer = selectedReviewer ? selectedReviewer.assigned_comments.split(',') : []

  const filterTaskResults = (comments) => {
    console.log('comments are', comments)
    console.log('comments for reviewer', commentsForReviewer) 
    return comments?.Q1?.filter((comment) => 
      commentsForReviewer.includes(comment.id.toString())
    )
  }

  return (
    <Stack>
      <Title>Comment moderation dashboard</Title>
      <Table
        id="reviewers"
        title="Reviewers"
        task="get_airtable_assignments"
        rowSelection="single"
        hiddenColumns={["id", "assigned_comments"]}

      />
      {selectedReviewer && (
        <Stack>
          <Table
            id="comments"
            title="Comments"
            task="comments_lookup"
            rowSelection="checkbox"
            outputTransform={filterTaskResults}
            hiddenColumns={["id", "created_at", "article_id", "approved", "moderated"]}
          />
        </Stack>
      )}
        {selectedComments && (
          <Stack direction="row" grow>
            {selectedComments.map((comment) => (
              <CommentDetail key={comment.id} comment={comment} />
            ))}
          </Stack>
        )}
      </Stack>
  );
};

const CommentDetail = ({ comment }) => {
  const commentDetail = `### Posted by: _${comment.posted_by}_
### Comment
**${comment.comment_text}**`;

  return (
    <Card>
      <Text>{commentDetail}</Text>
      <Button
        task={{
          slug: "approve_comment",
          params: { comment_id: comment.id },
        }}
        preset="secondary"
      >
        Approve
      </Button>
      <Button
        task={{
          slug: "reject_comment",
          params: { comment_id: comment.id },
        }}
        preset="secondary"
      >
        Reject
      </Button>
    </Card>
  );
};

export default airplane.view(
  {
    slug: "demo_customer_dashboard_getting_started",
    name: "Exercise -- Comment Approval Dashboard",
  },
  CustomerDashboard
);
