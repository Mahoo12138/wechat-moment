import { useMomentStore } from '@/store/useMomentStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Plus, Heart, MessageSquare, Upload, User } from 'lucide-react'
import { useState, useRef } from 'react'

export function InteractionConfig() {
  const { interactions, addLike, removeLike, addComment, removeComment } = useMomentStore()
  const [newLike, setNewLike] = useState('')
  const [newLikeAvatar, setNewLikeAvatar] = useState<string | undefined>(undefined)
  
  const [commentUser, setCommentUser] = useState('')
  const [commentAvatar, setCommentAvatar] = useState<string | undefined>(undefined)
  const [commentContent, setCommentContent] = useState('')
  const [commentReplyTo, setCommentReplyTo] = useState('')

  const likeFileInputRef = useRef<HTMLInputElement>(null)
  const commentFileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>, setAvatar: (val: string) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddLike = () => {
    if (newLike.trim()) {
      addLike(newLike.trim(), newLikeAvatar)
      setNewLike('')
      setNewLikeAvatar(undefined)
      if (likeFileInputRef.current) likeFileInputRef.current.value = ''
    }
  }

  const handleAddComment = () => {
    if (commentUser.trim() && commentContent.trim()) {
      addComment({
        user: commentUser.trim(),
        avatar: commentAvatar,
        content: commentContent.trim(),
        replyTo: commentReplyTo.trim() || undefined
      })
      setCommentContent('')
      // Not clearing user/avatar to allow easier multiple comments
    }
  }

  return (
    <div className="space-y-6">
      {/* Likes Configuration */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Heart className="w-4 h-4" /> Likes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 items-center">
            <div className="relative shrink-0">
                <div 
                    className="w-10 h-10 rounded-full bg-muted border flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80"
                    onClick={() => likeFileInputRef.current?.click()}
                >
                    {newLikeAvatar ? (
                        <img src={newLikeAvatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        <User className="w-5 h-5 text-muted-foreground" />
                    )}
                </div>
                <input 
                    type="file" 
                    ref={likeFileInputRef}
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleAvatarUpload(e, setNewLikeAvatar)}
                />
            </div>
            <Input 
              value={newLike}
              onChange={(e) => setNewLike(e.target.value)}
              placeholder="Username"
              onKeyDown={(e) => e.key === 'Enter' && handleAddLike()}
            />
            <Button size="icon" onClick={handleAddLike} disabled={!newLike.trim()}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {interactions.likes.map((like) => (
              <div key={like.id} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm flex items-center gap-1">
                <img src={like.avatar} className="w-4 h-4 rounded-full object-cover" alt="" />
                <span>{like.nickname}</span>
                <button onClick={() => removeLike(like.id)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {interactions.likes.length === 0 && (
              <p className="text-sm text-muted-foreground">No likes yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Comments Configuration */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Comments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
            <div className="flex gap-2">
                <div className="relative shrink-0">
                    <div 
                        className="w-10 h-10 rounded-full bg-background border flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80"
                        onClick={() => commentFileInputRef.current?.click()}
                    >
                        {commentAvatar ? (
                            <img src={commentAvatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-5 h-5 text-muted-foreground" />
                        )}
                    </div>
                    <input 
                        type="file" 
                        ref={commentFileInputRef}
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => handleAvatarUpload(e, setCommentAvatar)}
                    />
                </div>
                <div className="flex-1 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <Input 
                            value={commentUser}
                            onChange={(e) => setCommentUser(e.target.value)}
                            placeholder="Username"
                        />
                        <Input 
                            value={commentReplyTo}
                            onChange={(e) => setCommentReplyTo(e.target.value)}
                            placeholder="Reply To (Opt)"
                        />
                    </div>
                </div>
            </div>
            
            <Input 
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Comment content"
              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
            />
            <Button className="w-full" size="sm" onClick={handleAddComment} disabled={!commentUser.trim() || !commentContent.trim()}>
              Add Comment
            </Button>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {interactions.comments.map((comment) => (
              <div key={comment.id} className="flex items-start justify-between bg-secondary/50 p-2 rounded text-sm">
                <div className="flex gap-2">
                  <img src={comment.avatar} className="w-8 h-8 rounded-full object-cover shrink-0 bg-gray-200" alt="" />
                  <div>
                    <span className="font-semibold">{comment.user}</span>
                    {comment.replyTo && <span className="text-muted-foreground mx-1">➜ {comment.replyTo}</span>}
                    <div className="text-muted-foreground break-all">{comment.content}</div>
                  </div>
                </div>
                <button onClick={() => removeComment(comment.id)} className="text-muted-foreground hover:text-destructive p-1">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {interactions.comments.length === 0 && (
              <p className="text-sm text-muted-foreground">No comments yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
