"""empty message

Revision ID: aa537b105310
Revises: 1d481a71b2da
Create Date: 2022-03-01 12:59:19.704803

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aa537b105310'
down_revision = '1d481a71b2da'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('list', sa.Column('name', sa.String(length=120), nullable=False))
    op.add_column('list', sa.Column('color', sa.String(length=7), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('list', 'color')
    op.drop_column('list', 'name')
    # ### end Alembic commands ###
