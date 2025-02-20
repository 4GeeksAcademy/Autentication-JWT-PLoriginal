"""empty message

Revision ID: 793b8760a406
Revises: e16d9997f0f7
Create Date: 2025-02-20 19:04:19.201981

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '793b8760a406'
down_revision = 'e16d9997f0f7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.VARCHAR(length=80),
               type_=sa.String(length=300),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.String(length=300),
               type_=sa.VARCHAR(length=80),
               existing_nullable=False)

    # ### end Alembic commands ###
